// @flow

import webfontsGenerator from 'webfonts-generator'
import glob from 'glob'

import { generateCodepointsBackup } from './helper'
import type { Config, Options, WebfontsGeneratorOptions } from './helper'

export type BuildResult = string | {
  success: boolean,
  result?: {
    success: boolean,
    result: {
      svg?: string,
      ttf?: Buffer,
      woff?: Buffer,
      woff2?: Buffer,
      eot?: Buffer,
      generateCss?: Function,
    }
  },
  error?: {code: string, message: string},
}

/**
 * Responsible for the generation of the icon font
 * @param  {Object} options - an object containing all the needed options for the webfont generator.
 * @return {Object} a successful response or an error in case it occurs
 */
async function build (config: Config) {
  // if it is a --help access
  if (config && config.customOpts && config.customOpts.help) {
    return Promise.resolve(`
These are all the available arguments:
--out [String]: specifies where the generated code is stored into. Default "./build"
--icons [String]: specifies the directory that contains the SVG icons for which you want to generate the font. Default "./icons"
--fontname [String]: the name for your brand new font. Default "dcsIconFont"
--baseSelector [String]: specifies the base css class name. Default "dcs-icon"
--cssFontsUrl [String]: the font URL to be defined into the resulting CSS file. Default: the --fontname specified
--cssDest [String]: the destination path for the resulting CSS file. Default: The --out specified
--classprefix [String]: specifies the css class prefix for all your icons. Default "dcs-icon-"
--html: enables the generation of a html file with a preview for all the icons in the generated font
--normalize: enables font normalization webfonts-generator option, possible values: "true", "false"
--sass: generates a SCSS file instead of a CSS file
--htmlTemplate: for providing a custom HTML template
--cssTemplate: for providing a custom CSS template
--scssTemplate: for providing a custom SCSS template
--codepoints: for providing a custom codepoints json
--cssExt [String]: extension of css file, default: "css"
    `)
  }
  try {
    const webFonstOptions:WebfontsGeneratorOptions = setWebFontOptions(config)
    const result = await generateDcsIconFont(webFonstOptions)
    await generateCodepointsBackup(config)
    return result
  } catch (error) {
    console.error(error.message)
    return {success: false, error}
  }
}

/**
 * Responsible for evaluating the provided arguments (config) and, if valid,
 * set up the options for the webfont generator
 * @param {Object} options the configurations provided by the user through CLI arguments
 */
function setWebFontOptions (config: Config) {
  const iconsPath = config.customOpts.icons || 'icons/*.svg'
  const files = glob.sync(iconsPath)
  if (!files.length) {
    throw new Error(
      `"${iconsPath}" does not match any SVG file. It must be something similar to "your-path/*.svg"`
    )
  }
  if (config.customOpts.sass && config.customOpts.html) {
    throw new Error(
      'Is not possible to generate a HTML preview for SASS outputs'
    )
  }
  const options:WebfontsGeneratorOptions = Object.assign({}, config.webfontsOptions)
  options.files = files
  return options
}

/**
 * Responsible for triggering the generation of the font
 * @param  {Object} webfontsOptions the options for the webfont generator
 * @return {Object} a promise with the result of the generation
 */
function generateDcsIconFont (webfontsOptions: WebfontsGeneratorOptions) {
  return new Promise((resolve, reject) => {
    webfontsGenerator(webfontsOptions, (error, result) => {
      if (error) {
        reject(error)
        return
      }
      resolve({ success: true, result })
    })
  })
}

export { build }
