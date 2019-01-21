#! /usr/bin/env node
"use strict";

var WFCconfig = _interopRequireWildcard(require("./config/wf-config"));

var _minimist = _interopRequireDefault(require("minimist"));

var builder = _interopRequireWildcard(require("./builder"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var argv = (0, _minimist.default)(process.argv); // get all the specified args in the CLI

var config = WFCconfig.getConfig(argv); // get the setup for the web font generator

/**
 * Generate the icon font
 */

function build() {
  return _build.apply(this, arguments);
}

function _build() {
  _build = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var result, error, success;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return builder.build(config);

          case 3:
            result = _context.sent;

            if (typeof result !== 'string') {
              error = result.error, success = result.success;

              if (error) {
                console.log('Font failed with error:', error.message);
              } else {
                console.log('Font built with result:', success);
              }
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log('Font built failed with error:', _context.t0.message);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));
  return _build.apply(this, arguments);
}

build();