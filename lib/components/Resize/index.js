'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

var _bliss = require('../../utils/bliss');

require('./index.sass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'Resize';

var withResize = (0, _recompose.compose)((0, _recompose.withState)('contentWidth', 'setContentWidth'), (0, _recompose.withState)('contentRef', 'setContentRef'), (0, _recompose.withState)('initWidth', 'setInitWidth', 0), (0, _recompose.withState)('resizing', 'setResizing', 0), (0, _recompose.withHandlers)({
	handleResize: function handleResize(_ref) {
		var setContentWidth = _ref.setContentWidth,
		    initWidth = _ref.initWidth,
		    contentRef = _ref.contentRef;
		return function (event) {
			setContentWidth(Math.max(0, initWidth + event.clientX)); // minimum width 0
		};
	}
}), (0, _recompose.withHandlers)({
	handleStopResize: function handleStopResize(_ref2) {
		var contentRef = _ref2.contentRef,
		    setResizing = _ref2.setResizing,
		    onStopResize = _ref2.onStopResize,
		    handleResize = _ref2.handleResize;
		return function () {
			if (onStopResize && typeof onStopResize === "function") {
				// callback on stop resize
				onStopResize({
					width: contentRef.style.width,
					height: contentRef.style.height
				});
			}
			setResizing(false);

			window.removeEventListener('mousemove', handleResize, false);
		};
	}
}), (0, _recompose.withProps)(function (_ref3) {
	var resizing = _ref3.resizing,
	    handleStopResize = _ref3.handleStopResize;

	if (!resizing) {
		window.removeEventListener('mouseup', handleStopResize, false);
	}
}), (0, _recompose.withHandlers)({
	handleStartResize: function handleStartResize(_ref4) {
		var setInitWidth = _ref4.setInitWidth,
		    setResizing = _ref4.setResizing,
		    contentRef = _ref4.contentRef,
		    handleResize = _ref4.handleResize,
		    handleStopResize = _ref4.handleStopResize;
		return function (event) {
			if (event.nativeEvent.which === 1) {
				// left click
				var startX = event.clientX;
				var startWidth = parseInt(contentRef.clientWidth);

				setInitWidth(startWidth - startX);
				setResizing(1);

				window.addEventListener('mousemove', handleResize, false);
				window.addEventListener('mouseup', handleStopResize, false);
			}
		};
	}
}), (0, _recompose.lifecycle)({
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener('mousemove', this.props.handleResize, false);
		window.removeEventListener('mouseup', this.props.handleStopResize, false);
	}
}), _recompose.pure);

var renderResize = function renderResize(_ref5) {
	var children = _ref5.children,
	    handleStartResize = _ref5.handleStartResize,
	    resizing = _ref5.resizing,
	    setContentRef = _ref5.setContentRef,
	    height = _ref5.height,
	    _ref5$width = _ref5.width,
	    width = _ref5$width === undefined ? 0 : _ref5$width,
	    _ref5$contentWidth = _ref5.contentWidth,
	    contentWidth = _ref5$contentWidth === undefined ? width : _ref5$contentWidth,
	    maxWidth = _ref5.maxWidth,
	    minWidth = _ref5.minWidth,
	    className = _ref5.className;
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

Resize.propTypes = {
	width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	maxWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	minWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.object]),
	onStopResize: _propTypes2.default.func
};

exports.default = Resize;