const chai = require('chai')
const rewire = require("rewire")
const rimraf = require("rimraf")
const config = require("../src/config/wf-config")
const getCodePointsFromJson = require("../src/helper").getCodePointsFromJson
const builder = require("../src/builder")

const expect = chai.expect

describe('builder', function () {
  describe('#build()', function () {
    afterEach(() => {
      rimraf.sync('build')
    })

    it('should return success: false', async function () {
      rimraf.sync('build')
      const result = await builder.build(config.getConfig({icons: 'icons/*.png'}))
      expect(result.success).to.equal(false)
      expect(result.error.message).to.equal('"icons/*.png" does not match any SVG file. It must be something similar to "your-path/*.svg"')
    })

    it('should return -1 when the value is not present', async function () {
      const result = await builder.build(config.getConfig())
      expect(result.success).to.equal(true)
    })

    it('should throw error with sass and html args', async function () {
      const result = await builder.build(config.getConfig({html: 'true', sass: 'true'}))
      expect(result.success).to.equal(false)
      expect(result.error.message).to.equal('Is not possible to generate a HTML preview for SASS outputs')
    })

    it('should throw error from webfonts-generator', async function () {
      const options = config.getConfig({})
      delete options.webfontsOptions.dest
      const result = await builder.build(options)
      expect(result.success).to.equal(false)
      expect(result.error.message).to.equal('"options.dest" is undefined.')
    })

    it('should throw error with sass and html args', async function () {
      const originalCodepointsPath =  `${__dirname}/../demo/codepoints.json`
      const result = await builder.build(config.getConfig({codepoints: originalCodepointsPath}))
      const originalCodepoints = getCodePointsFromJson(originalCodepointsPath)
      const codepoints = getCodePointsFromJson( `${__dirname}/../build/wfgIconFont.codepoints.json`)
      expect(result.success).to.equal(true)
      expect(codepoints['x16-app']).to.eql(originalCodepoints['x16-app'])
      expect(codepoints['x16-platform-mobileweb']).to.eql(originalCodepoints['x16-platform-mobileweb'])
      expect(codepoints['x24-platform-android']).to.eql(originalCodepoints['x24-platform-android'])
      expect(codepoints['x24-platform-mobileweb']).to.eql(originalCodepoints['x24-platform-mobileweb'])
      expect(codepoints['x36-twitter']).to.eql(originalCodepoints['x36-twitter'])
    })

    it('should throw error with sass and html args', async function () {
      const result = await builder.build({customOpts: {help: true}})
      expect(result).to.equal(`
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
    })
  })
})
