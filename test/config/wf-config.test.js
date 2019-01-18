const chai = require('chai')
const rewire = require("rewire")

const config = rewire("../../src/config/wf-config")

const expect = chai.expect
const getConfig = config.getConfig

config.__set__('__dirname', '/__CONFIG_DIR__')

const defaultConfiguration =  {
  buildPath: './build',
  customOpts: {},
  webfontsOptions: {
    dest: './build/wfgIconFont',
    cssDest: './build/wfgIconFont.css',
    cssFontsUrl: 'wfgIconFont',
    fontName: 'wfgIconFont',
    cssTemplate: '/__CONFIG_DIR__/../../templates/css.hbs',
    templateOptions: { classPrefix: 'icon-', baseSelector: 'icon' },
    htmlTemplate: '/__CONFIG_DIR__/../../templates/html.hbs',
    types: [ 'svg', 'ttf', 'woff', 'woff2', 'eot' ],
    html: false,
    htmlDest: './build/wfgIconFont-preview.html',
    descent: 0,
    codepoints: {}
  }
}

describe('wf-config', function () {
  describe('#getConfig()', function () {
    it('should return default configuration', function () {
      const options = getConfig({});
      expect(options).to.eql(defaultConfiguration)
    })
    it('should return default configuration', function () {
      const options = getConfig();
      expect(options).to.eql(defaultConfiguration)
    })
    it('should return sass template', function () {
      const customConfiguration ={
        ...defaultConfiguration,
        webfontsOptions: {
          ...defaultConfiguration.webfontsOptions,
          cssDest: './build/wfgIconFont.scss',
          cssTemplate: '/__CONFIG_DIR__/../../templates/scss.hbs',
        },
        customOpts: {
          sass: 'true',
        }
      }
      const options = getConfig({sass: 'true'});
      expect(options).to.eql(customConfiguration)
    })
    it('should return custom types', function () {
      const customConfiguration ={
        ...defaultConfiguration,
        webfontsOptions: {
          ...defaultConfiguration.webfontsOptions,
          types: [ 'ttf', 'woff', 'eot' ],
        },
        customOpts: {
          types: 'ttf, woff,eot',
        }
      }
      const options = getConfig({types: 'ttf, woff,eot'});
      expect(options).to.eql(customConfiguration)
    })


    it('should return custom default csss template', function () {
      const customConfiguration ={
        ...defaultConfiguration,
        webfontsOptions: {
          ...defaultConfiguration.webfontsOptions,
        },
        customOpts: {
          scssTemplate: '/__CONFIG_DIR__/templates/scss.hbs',
        }
      }
      const options = getConfig({scssTemplate: '/__CONFIG_DIR__/templates/scss.hbs'});
      expect(options).to.eql(customConfiguration)
    })

    it('should return custom scss template', function () {
      const customConfiguration ={
        ...defaultConfiguration,
        webfontsOptions: {
          ...defaultConfiguration.webfontsOptions,
          cssDest: './build/wfgIconFont.scss',
          cssTemplate: '/__CONFIG_DIR__/templates/scss.hbs',
        },
        customOpts: {
          sass: true,
          scssTemplate: '/__CONFIG_DIR__/templates/scss.hbs',
        }
      }
      const options = getConfig({sass: true, scssTemplate: '/__CONFIG_DIR__/templates/scss.hbs'});
      expect(options).to.eql(customConfiguration)
    })

    it('should return custom css template', function () {
      const customConfiguration ={
        ...defaultConfiguration,
        webfontsOptions: {
          ...defaultConfiguration.webfontsOptions,
          cssTemplate: '/__CONFIG_DIR__/templates/scss.hbs',
        },
        customOpts: {
          cssTemplate: '/__CONFIG_DIR__/templates/scss.hbs',
        }
      }
      const options = getConfig({cssTemplate: '/__CONFIG_DIR__/templates/scss.hbs'});
      expect(options).to.eql(customConfiguration)
    })

    it('should return custom htmlDest', function () {
      const customConfiguration ={
        ...defaultConfiguration,
        webfontsOptions: {
          ...defaultConfiguration.webfontsOptions,
          htmlDest: './__HTML_DIR__/wfgIconFont-preview.html'
        },
        customOpts: {
          htmlDest: './__HTML_DIR__',
        }
      }
      const options = getConfig({htmlDest: './__HTML_DIR__'});
      expect(options).to.eql(customConfiguration)
    })
    it('should return fixedWidth true', function () {
      const customConfiguration ={
        ...defaultConfiguration,
        webfontsOptions: {
          ...defaultConfiguration.webfontsOptions,
          fixedWidth: true,
        },
        customOpts: {
          fixedWidth: 'true',
        }
      }
      const options = getConfig({ fixedWidth: 'true'});
      expect(options).to.eql(customConfiguration)
    })

    it('should return centerHorizontally true', function () {
      const customConfiguration ={
        ...defaultConfiguration,
        webfontsOptions: {
          ...defaultConfiguration.webfontsOptions,
          centerHorizontally: true,
        },
        customOpts: {
          centerHorizontally: 'true',
        }
      }
      const options = getConfig({ centerHorizontally: 'true'});
      expect(options).to.eql(customConfiguration)
    })

    it('should return normalize true', function () {
      const customConfiguration ={
        ...defaultConfiguration,
        webfontsOptions: {
          ...defaultConfiguration.webfontsOptions,
          normalize: true,
        },
        customOpts: {
          normalize: 'true',
        }
      }
      const options = getConfig({ normalize: 'true'});
      expect(options).to.eql(customConfiguration)
    })

    it('should return fontHeight true', function () {
      const customConfiguration ={
        ...defaultConfiguration,
        webfontsOptions: {
          ...defaultConfiguration.webfontsOptions,
          fontHeight: 20,
        },
        customOpts: {
          fontHeight: '20',
        }
      }
      const options = getConfig({ fontHeight: '20'});
      expect(options).to.eql(customConfiguration)
    })
    it('should return descent in webfontsOptions', function () {
      const customConfiguration ={
        ...defaultConfiguration,
        webfontsOptions: {
          ...defaultConfiguration.webfontsOptions,
          descent: 20,
        },
        customOpts: {
          descent: 20,
        }
      }
      const options = getConfig({descent: 20});
      expect(options).to.eql(customConfiguration)
    })
  })
})
