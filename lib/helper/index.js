"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCodePointsFromJson = exports.generateCodepointsBackup = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Responsible for triggering the generation of the font
 * @param  {Object} webfontsOptions the options for the webfont generator
 * @return {Object} a promise with the result of the generation
 */
var generateCodepointsBackup = function generateCodepointsBackup(config) {
  _fs.default.writeFileSync("".concat(config.buildPath, "/").concat(config.webfontsOptions.fontName, ".codepoints.json"), JSON.stringify(config.webfontsOptions.codepoints));
};

exports.generateCodepointsBackup = generateCodepointsBackup;

var getCodePointsFromJson = function getCodePointsFromJson(filePath) {
  // Read content of css file and
  var codepoints = {};

  if (_fs.default.existsSync(filePath)) {
    var json = _fs.default.readFileSync(filePath, 'utf-8');

    try {
      codepoints = JSON.parse(json);
    } catch (e) {}
  }

  return codepoints;
};

exports.getCodePointsFromJson = getCodePointsFromJson;