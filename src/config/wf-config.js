// @flow

import path from 'path'

import { getCodePointsFromJson } from '../helper'
import type { Config, Options, WebfontsGeneratorOptions } from '../helper'


/**
 * Responsible for merging the default font configuration and the overrides
 * specified by the user through the CLI args
 * @param  {Object} customOpts the options specified by the user
 * @return {Object} the resulting configuration for the webfont generator
 */
export const getConfig = function (opts: Options): Config {
  const customOpts = opts || {}
  const buildPath = customOpts.out || './build'
  const fontName = customOpts.fontName || 'wfgIconFont'
  const cssDest = customOpts.cssDest || buildPath
  const cssExt = customOpts.sass ? `scss` : `css`
  const descent = customOpts.descent ? parseInt(customOpts.descent) : 0
  const types = customOpts.types ? customOpts.types.replace(' ', '').split(',') : ['svg', 'ttf', 'woff', 'woff2', 'eot']

  const sassTemplate = customOpts.scssTemplate ? customOpts.scssTemplate : `${__dirname}/../../templates/scss.hbs`
  const cssTemplate = customOpts.cssTemplate ? customOpts.cssTemplate : `${__dirname}/../../templates/css.hbs`

  const webfontsOptions: WebfontsGeneratorOptions = {
    dest: `${buildPath}/${fontName}`,
    cssDest: `${cssDest}/${fontName}.${cssExt}`,
    cssFontsUrl: customOpts.cssFontsUrl || fontName,
    fontName,
    cssTemplate: customOpts.sass ? sassTemplate : cssTemplate,
    templateOptions: {
      baseSelector: customOpts.baseSelector || 'icon',
      classPrefix: customOpts.classPrefix || 'icon-'
    },
    htmlTemplate: customOpts.htmlTemplate || `${__dirname}/../../templates/html.hbs`,
    types,
    html: customOpts.html || false,
    htmlDest: customOpts.htmlDest
      ? `${customOpts.htmlDest}/${fontName}-preview.html`
      : `${cssDest}/${fontName}-preview.html`,
    descent
  }

  if (customOpts.fixedWidth) {
    webfontsOptions.fixedWidth = customOpts.fixedWidth === 'true'
  }

  if (customOpts.centerHorizontally) {
    webfontsOptions.centerHorizontally =
      customOpts.centerHorizontally === 'true'
  }

  if (customOpts.normalize) {
    webfontsOptions.normalize = customOpts.normalize === 'true'
  }

  if (customOpts.fontHeight) {
    webfontsOptions.fontHeight = Number(customOpts.fontHeight)
  }
  const filePath = customOpts.codepoints || path.resolve(process.cwd(), `${buildPath}/${fontName}.codepoints.json`)
  webfontsOptions.codepoints = getCodePointsFromJson(filePath)

  return {
    buildPath,
    customOpts,
    webfontsOptions
  }
}
