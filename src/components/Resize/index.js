import React from 'react';


import T from 'prop-types';
import { compose, pure, withHandlers, withState, withProps, lifecycle } from 'recompose';

import { bm, be } from '../../utils/bliss';
import './index.sass';


const MODULE_NAME = 'Resize';

export const withResize = compose(
	withState('contentWidth', 'setContentWidth'),
	withState('contentRef', 'setContentRef'),
	withState('initWidth', 'setInitWidth', 0),
	withState('resizing', 'setResizing', 0),
	withHandlers({
		handleResize: ({
			setContentWidth,
			initWidth,
			contentRef,
		}) => (event) => {
			setContentWidth(Math.max(0, initWidth + event.clientX)); // minimum width 0
		},
	}),
	withHandlers({
		handleStopResize: ({
			contentRef,
			setResizing,
			onStopResize,

			handleResize,
		}) => () => {
			if (onStopResize && typeof onStopResize === "function") { // callback on stop resize
				onStopResize({
					width: contentRef.clientWidth,
					height: contentRef.clientHeight,
				});
			}
			setResizing(false);

			window.removeEventListener('mousemove', handleResize, false);
		},
	}),
	withProps(({ resizing, handleStopResize }) => {
		if (!resizing) {
			window.removeEventListener('mouseup', handleStopResize, false);
		}
	}),
	withHandlers({
		handleStartResize: ({
			setInitWidth,
			setResizing,
			contentRef,

			handleResize,
			handleStopResize
		}) => (event) => {
			if (event.nativeEvent.which === 1) { // left click
				const startX = event.clientX;
				const startWidth = parseInt(contentRef.clientWidth);

				setInitWidth(startWidth - startX);
				setResizing(1);

				window.addEventListener('mousemove', handleResize, false);
				window.addEventListener('mouseup', handleStopResize, false);
			}
		},
	}),
	lifecycle({
		componentWillUnmount() {
			window.removeEventListener('mousemove', this.props.handleResize, false);
			window.removeEventListener('mouseup', this.props.handleStopResize, false);
		}
	}),
	pure,
);

export const renderResize = ({
	children,
	handleStartResize,
	resizing,
	setContentRef,
	height,
	width = 0,
	contentWidth = width,
	maxWidth,
	minWidth,
	className,
}) => (
	<div
		className={bm(MODULE_NAME, { resizing }, className)}
		style={{
			width: contentWidth,
			height,
			maxWidth,
			minWidth,
		}}
		ref={setContentRef}
	>
		<div className={be(MODULE_NAME, 'content')}>
			{children}
		</div>
		<div
			className={be(MODULE_NAME, 'handle')}
			onMouseDown={handleStartResize}
		/>
	</div>
);

const Resize = withResize(renderResize);

Resize.propTypes = {
	width: T.oneOfType([T.number, T.string]),
	height: T.oneOfType([T.number, T.string]),
	maxWidth: T.oneOfType([T.number, T.string]),
	minWidth: T.oneOfType([T.number, T.string]),
	className: T.oneOfType([T.string, T.array, T.object]),
	onStopResize: T.func,
};

export default Resize;
