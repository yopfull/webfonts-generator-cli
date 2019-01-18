"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = void 0;

var _path = _interopRequireDefault(require("path"));

var _helper = require("../helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Responsible for merging the default font configuration and the overrides
 * specified by the user through the CLI args
 * @param  {Object} customOpts the options specified by the user
 * @return {Object} the resulting configuration for the webfont generator
 */
var getConfig = function getConfig(opts) {
  var customOpts = opts || {};
  var buildPath = customOpts.out || './build';
  var fontName = customOpts.fontName || 'wfgIconFont';
  var cssDest = customOpts.cssDest || buildPath;
  var cssExt = customOpts.sass ? "scss" : "css";
  var descent = customOpts.descent ? parseInt(customOpts.descent) : 0;
  var types = customOpts.types ? customOpts.types.replace(' ', '').split(',') : ['svg', 'ttf', 'woff', 'woff2', 'eot'];
  var sassTemplate = customOpts.scssTemplate ? customOpts.scssTemplate : "".concat(__dirname, "/../../templates/scss.hbs");
  var cssTemplate = customOpts.cssTemplate ? customOpts.cssTemplate : "".concat(__dirname, "/../../templates/css.hbs");
  var webfontsOptions = {
    dest: "".concat(buildPath, "/").concat(fontName),
    cssDest: "".concat(cssDest, "/").concat(fontName, ".").concat(cssExt),
    cssFontsUrl: customOpts.cssFontsUrl || fontName,
    fontName: fontName,
    cssTemplate: customOpts.sass ? sassTemplate : cssTemplate,
    templateOptions: {
      baseSelector: customOpts.baseSelector || 'icon',
      classPrefix: customOpts.classPrefix || 'icon-'
    },
    htmlTemplate: customOpts.htmlTemplate || "".concat(__dirname, "/../../templates/html.hbs"),
    types: types,
    html: customOpts.html || false,
    htmlDest: customOpts.htmlDest ? "".concat(customOpts.htmlDest, "/").concat(fontName, "-preview.html") : "".concat(cssDest, "/").concat(fontName, "-preview.html"),
    descent: descent
  };

  if (customOpts.fixedWidth) {
    webfontsOptions.fixedWidth = customOpts.fixedWidth === 'true';
  }

  if (customOpts.centerHorizontally) {
    webfontsOptions.centerHorizontally = customOpts.centerHorizontally === 'true';
  }

  if (customOpts.normalize) {
    webfontsOptions.normalize = customOpts.normalize === 'true';
  }

  if (customOpts.fontHeight) {
    webfontsOptions.fontHeight = Number(customOpts.fontHeight);
  }

  var filePath = customOpts.codepoints || _path.default.resolve(process.cwd(), "".concat(buildPath, "/").concat(fontName, ".codepoints.json"));

  webfontsOptions.codepoints = (0, _helper.getCodePointsFromJson)(filePath);
  return {
    buildPath: buildPath,
    customOpts: customOpts,
    webfontsOptions: webfontsOptions
  };
};

exports.getConfig = getConfig;