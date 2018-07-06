'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.be = exports.bm = undefined;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var item = function item(prefix, modifiers, classes) {
    var blissClass = [prefix];
    var normalizedModifiers = modifiers ? (0, _classnames2.default)(modifiers) : false;
    var normalizedClasses = classes ? (0, _classnames2.default)(classes) : false;

    if (normalizedModifiers) {
        blissClass.push(normalizedModifiers.trim().split(' ').map(function (mod) {
            return prefix + '--' + mod;
        }).join(' '));
    }

    if (normalizedClasses) {
        blissClass.push(normalizedClasses);
    }

    return blissClass.join(' ');
};

var blissModule = function blissModule(moduleName) {
    var modifiers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var classes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return item(moduleName, modifiers, classes);
};

var blissElement = function blissElement(moduleName, elementName) {
    var modifiers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var classes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return item(moduleName + '-' + elementName, modifiers, classes);
};

var bm = exports.bm = blissModule;
var be = exports.be = blissElement;