// @flow

import fs from 'fs'

export type Options = {
  baseSelector?: string,
  centerHorizontally?: string,
  classPrefix?: string,
  codepoints?: string,
  cssDest?: string,
  cssFontsUrl?: string,
  cssTemplate?: string,
  descent?: string,
  fixedWidth?: string,
  fontHeight?: string,
  fontName?: string,
  help?: boolean,
  html?: boolean,
  htmlDest?: string,
  htmlTemplate?: string,
  icons?: string,
  normalize?: string,
  out?: string,
  sass?: boolean,
  scssTemplate?: string,
  types?: string,
}

export type CodePoints = {
  [string]: string,
}

export type TemplateOptions = {
  baseSelector: string,
  classPrefix: string,
}

export type WebfontsGeneratorOptions = {
  centerHorizontally?: boolean,
  codepoints?: CodePoints,
  cssDest: string,
  cssFontsUrl: string,
  cssTemplate: string,
  descent?: number,
  files?: string[],
  fixedWidth?: boolean,
  fontHeight?: number,
  fontName: string,
  html?: boolean,
  htmlDest: string,
  htmlTemplate: string,
  normalize?: boolean,
  templateOptions: TemplateOptions,
  types?: string[],
}

export type Config = {
  buildPath: string,
  customOpts: Options,
  webfontsOptions: WebfontsGeneratorOptions,
}

/**
 * Responsible for triggering the generation of the font
 * @param  {Object} webfontsOptions the options for the webfont generator
 * @return {Object} a promise with the result of the generation
 */
export const generateCodepointsBackup = function (config: Config) {
  fs.writeFileSync(`${config.buildPath}/${config.webfontsOptions.fontName}.codepoints.json`, JSON.stringify(config.webfontsOptions.codepoints))
}

export const getCodePointsFromJson = function (filePath: string): CodePoints {
  // Read content of css file and
  let codepoints: CodePoints = {}
  if (fs.existsSync(filePath)) {
    const json = fs.readFileSync(filePath, { encoding: 'utf-8' })
    try {
      codepoints = JSON.parse(json)
    } catch (e) {

    }
  }
  return codepoints
}
