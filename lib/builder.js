"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = build;

var _webfontsGenerator = _interopRequireDefault(require("webfonts-generator"));

var _glob = _interopRequireDefault(require("glob"));

var _helper = require("./helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Responsible for the generation of the icon font
 * @param  {Object} config - an object containing all the needed options for the webfont generator.
 * @return {Object} a successful response or an error in case it occurs
 */
function build(_x) {
  return _build.apply(this, arguments);
}
/**
 * Responsible for evaluating the provided arguments (config) and, if valid,
 * set up the options for the webfont generator
 * @param {Object} config the configurations provided by the user through CLI arguments
 */


function _build() {
  _build = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(config) {
    var options, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(config && config.customOpts && config.customOpts.help)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", Promise.resolve("\nThese are all the available arguments:\n--out [String]: specifies where the generated code is stored into. Default \"./build\"\n--icons [String]: specifies the directory that contains the SVG icons for which you want to generate the font. Default \"./icons\"\n--fontname [String]: the name for your brand new font. Default \"dcsIconFont\"\n--baseSelector [String]: specifies the base css class name. Default \"dcs-icon\"\n--cssFontsUrl [String]: the font URL to be defined into the resulting CSS file. Default: the --fontname specified\n--cssDest [String]: the destination path for the resulting CSS file. Default: The --out specified\n--classprefix [String]: specifies the css class prefix for all your icons. Default \"dcs-icon-\"\n--html: enables the generation of a html file with a preview for all the icons in the generated font\n--normalize: enables font normalization webfonts-generator option, possible values: \"true\", \"false\"\n--sass: generates a SCSS file instead of a CSS file\n--htmlTemplate: for providing a custom HTML template\n--cssTemplate: for providing a custom CSS template\n--scssTemplate: for providing a custom SCSS template\n--codepoints: for providing a custom codepoints json\n--cssExt [String]: extension of css file, default: \"css\"\n    "));

          case 2:
            _context.prev = 2;
            options = setWebFontOptions(config);
            _context.next = 6;
            return generateDcsIconFont(options);

          case 6:
            result = _context.sent;
            _context.next = 9;
            return (0, _helper.generateCodepointsBackup)(config);

          case 9:
            return _context.abrupt("return", result);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            console.error(_context.t0.message);
            return _context.abrupt("return", {
              success: false,
              error: _context.t0
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 12]]);
  }));
  return _build.apply(this, arguments);
}

function setWebFontOptions(config) {
  var iconsPath = config.customOpts.icons || 'icons/*.svg';

  var files = _glob.default.sync(iconsPath);

  if (!files.length) {
    throw new Error("\"".concat(iconsPath, "\" does not match any SVG file. It must be something similar to \"your-path/*.svg\""));
  }

  if (config.customOpts.sass && config.customOpts.html) {
    throw new Error('Is not possible to generate a HTML preview for SASS outputs');
  }

  var options = Object.assign({}, config.webfontsOptions);
  options.files = files;
  return options;
}
/**
 * Responsible for triggering the generation of the font
 * @param  {Object} webfontsOptions the options for the webfont generator
 * @return {Object} a promise with the result of the generation
 */


function generateDcsIconFont(webfontsOptions) {
  return new Promise(function (resolve, reject) {
    (0, _webfontsGenerator.default)(webfontsOptions, function (error, result) {
      if (error) {
        reject(error);
        return;
      }

      resolve({
        success: true,
        result: result
      });
    });
  });
}