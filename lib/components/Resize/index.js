'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderResize = exports.withResize = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

var _bliss = require('../../utils/bliss');

require('./index.sass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'Resize';

var withResize = exports.withResize = (0, _recompose.compose)((0, _recompose.withState)('contentWidth', 'setContentWidth'), (0, _recompose.withState)('resizing', 'setResizing', 0), (0, _recompose.withHandlers)(function (_ref) {
	var setResizing = _ref.setResizing,
	    onStopResize = _ref.onStopResize,
	    setContentWidth = _ref.setContentWidth;

	var contentRef = void 0;
	var initWidth = void 0;

	var handleContentRef = function handleContentRef() {
		return function (ref) {
			if (!contentRef) {
				contentRef = ref;
			}
		};
	};

	var handleResizeFunc = function handleResizeFunc(event) {
		setContentWidth(Math.max(0, initWidth + event.clientX)); // minimum width 0
	};

	var handleUnbindEventsFunc = function handleUnbindEventsFunc() {
		window.removeEventListener('mousemove', handleResizeFunc, false);
		window.removeEventListener('mouseup', handleStopResizeFunc, false);
	};
	var handleUnbindEvents = function handleUnbindEvents() {
		return handleUnbindEventsFunc;
	};

	var handleStopResizeFunc = function handleStopResizeFunc() {
		if (typeof onStopResize === "function") {
			// callback on stop resize
			onStopResize({
				width: contentRef.clientWidth,
				height: contentRef.clientHeight
			});
		}
		setResizing(false);

		handleUnbindEventsFunc();
	};

	var handleStartResize = function handleStartResize(_ref2) {
		var setResizing = _ref2.setResizing;
		return function (event) {
			if (event.nativeEvent.which === 1) {
				// left click
				var startX = event.clientX;
				var startWidth = parseInt(contentRef.clientWidth);

				initWidth = startWidth - startX;
				setResizing(true);

				window.addEventListener('mousemove', handleResizeFunc, false);
				window.addEventListener('mouseup', handleStopResizeFunc, false);
			}
		};
	};

	return {
		handleStartResize: handleStartResize,
		handleContentRef: handleContentRef,

		handleUnbindEvents: handleUnbindEvents
	};
}), (0, _recompose.lifecycle)({
	componentWillUnmount: function componentWillUnmount() {
		this.props.handleUnbindEvents();
	}
}), _recompose.pure);

var renderResize = exports.renderResize = function renderResize(_ref3) {
	var children = _ref3.children,
	    handleStartResize = _ref3.handleStartResize,
	    resizing = _ref3.resizing,
	    handleContentRef = _ref3.handleContentRef,
	    height = _ref3.height,
	    _ref3$width = _ref3.width,
	    width = _ref3$width === undefined ? 'auto' : _ref3$width,
	    _ref3$contentWidth = _ref3.contentWidth,
	    contentWidth = _ref3$contentWidth === undefined ? width : _ref3$contentWidth,
	    maxWidth = _ref3.maxWidth,
	    minWidth = _ref3.minWidth,
	    className = _ref3.className;
	return _react2.default.createElement(
		'div',
		{
			className: (0, _bliss.bm)(MODULE_NAME, { resizing: resizing }, className),
			style: {
				width: contentWidth,
				height: height,
				maxWidth: maxWidth,
				minWidth: minWidth
			},
			ref: handleContentRef
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

Resize.propTypes = {
	width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	maxWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	minWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.object]),
	onStopResize: _propTypes2.default.func
};

exports.default = Resize;