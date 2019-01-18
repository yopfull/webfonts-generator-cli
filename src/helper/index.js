import fs from 'fs'

/**
 * Responsible for triggering the generation of the font
 * @param  {Object} webfontsOptions the options for the webfont generator
 * @return {Object} a promise with the result of the generation
 */
export const generateCodepointsBackup = function (config) {
  fs.writeFileSync(`${config.buildPath}/${config.webfontsOptions.fontName}.codepoints.json`, JSON.stringify(config.webfontsOptions.codepoints))
}

export const getCodePointsFromJson = function (filePath) {
  // Read content of css file and
  let codepoints = {}
  if (fs.existsSync(filePath)) {
    const json = fs.readFileSync(filePath, 'utf-8')
    try {
      codepoints = JSON.parse(json)
    } catch (e) {

    }
  }
  return codepoints
}
