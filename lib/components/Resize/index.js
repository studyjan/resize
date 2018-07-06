'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lifecycle2 = require('recompose/lifecycle');

var _lifecycle3 = _interopRequireDefault(_lifecycle2);

var _withState2 = require('recompose/withState');

var _withState3 = _interopRequireDefault(_withState2);

var _withHandlers2 = require('recompose/withHandlers');

var _withHandlers3 = _interopRequireDefault(_withHandlers2);

var _pure2 = require('recompose/pure');

var _pure3 = _interopRequireDefault(_pure2);

var _compose2 = require('recompose/compose');

var _compose3 = _interopRequireDefault(_compose2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bliss = require('../../utils/bliss');

require('./index.sass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'Resize';

var withResize = (0, _compose3.default)((0, _withState3.default)('contentWidth', 'setContentWidth'), (0, _withState3.default)('contentRef', 'setContentRef'), (0, _withState3.default)('initWidth', 'setInitWidth', 0), (0, _withState3.default)('resizing', 'setResizing', 0), (0, _withHandlers3.default)({
	handleResize: function handleResize(_ref) {
		var setContentWidth = _ref.setContentWidth,
		    initWidth = _ref.initWidth,
		    contentRef = _ref.contentRef;
		return function (event) {
			setContentWidth(initWidth + event.clientX);
		};
	}
}), (0, _withHandlers3.default)({
	handleStopResize: function handleStopResize(_ref2) {
		var contentRef = _ref2.contentRef,
		    resizing = _ref2.resizing,
		    setResizing = _ref2.setResizing,
		    onStopResize = _ref2.onStopResize,
		    handleResize = _ref2.handleResize;
		return function (event) {
			if (resizing) {
				if ((0, _isFunction3.default)(onStopResize)) {
					onStopResize({
						width: contentRef.style.width
					});
				}
				setResizing(false);

				window.removeEventListener('mousemove', handleResize, false);
			}
		};
	}
}), (0, _withHandlers3.default)({
	handleStartResize: function handleStartResize(_ref3) {
		var setInitWidth = _ref3.setInitWidth,
		    setResizing = _ref3.setResizing,
		    contentRef = _ref3.contentRef,
		    handleResize = _ref3.handleResize,
		    handleStopResize = _ref3.handleStopResize;
		return function (event) {
			var startX = event.clientX;
			var startWidth = parseInt(contentRef.style.width);

			setInitWidth(startWidth - startX);
			setResizing(1);

			window.addEventListener('mousemove', handleResize, false);
			window.addEventListener('mouseup', handleStopResize, false);
		};
	}
}), (0, _lifecycle3.default)({
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener('mousemove', this.props.handleResize, false);
		window.removeEventListener('mouseup', this.props.handleStopResize, false);
	}
}), _pure3.default);

var renderResize = function renderResize(_ref4) {
	var children = _ref4.children,
	    handleStartResize = _ref4.handleStartResize,
	    setContentRef = _ref4.setContentRef,
	    _ref4$contentWidth = _ref4.contentWidth,
	    contentWidth = _ref4$contentWidth === undefined ? 100 : _ref4$contentWidth;
	return _react2.default.createElement(
		'div',
		{
			className: (0, _bliss.bm)(MODULE_NAME),
			style: {
				width: contentWidth
			},
			ref: setContentRef
		},
		_react2.default.createElement(
			'div',
			{ className: (0, _bliss.be)(MODULE_NAME, 'content') },
			children
		),
		_react2.default.createElement('div', {
			className: (0, _bliss.be)(MODULE_NAME, 'handle'),
			onMouseDown: handleStartResize
		})
	);
};

var Resize = withResize(renderResize);

exports.default = Resize;