import React from 'react';
import T from 'prop-types';
import { compose, pure, withHandlers, withState, lifecycle } from 'recompose';

import { bm, be } from '../../utils/bliss';
import './index.sass';


const MODULE_NAME = 'Resize';

export const withResize = compose(
	withState('contentWidth', 'setContentWidth'),
	withState('resizing', 'setResizing', 0),
	withHandlers(({ setResizing, onStopResize, setContentWidth }) => {
		let contentRef;
		let initWidth;

		const handleContentRef = () => (ref) => {
			if (!contentRef) {
				contentRef = ref;
			}
		};

		const handleResizeFunc = (event) => {
			setContentWidth(Math.max(0, initWidth + event.clientX)); // minimum width 0
		};

		const handleUnbindEventsFunc = () => {
			window.removeEventListener('mousemove', handleResizeFunc, false);
			window.removeEventListener('mouseup', handleStopResizeFunc, false);
		};
		const handleUnbindEvents = () => handleUnbindEventsFunc;

		const handleStopResizeFunc = () => {
			if (typeof onStopResize === "function") { // callback on stop resize
				onStopResize({
					width: contentRef.clientWidth,
					height: contentRef.clientHeight,
				});
			}
			setResizing(false);

			handleUnbindEventsFunc();
		};

		const handleStartResize = ({ setResizing }) => (event) => {
			if (event.nativeEvent.which === 1) { // left click
				const startX = event.clientX;
				const startWidth = parseInt(contentRef.clientWidth);

				initWidth = startWidth - startX;
				setResizing(true);

				window.addEventListener('mousemove', handleResizeFunc, false);
				window.addEventListener('mouseup', handleStopResizeFunc, false);
			}
		};

		return {
			handleStartResize,
			handleContentRef,

			handleUnbindEvents,
		}
	}),
	lifecycle({
		componentWillUnmount() {
			this.props.handleUnbindEvents();
		}
	}),
	pure,
);

export const renderResize = ({
	children,
	handleStartResize,
	resizing,
	handleContentRef,
	height,
	width = 'auto',
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
		ref={handleContentRef}
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
