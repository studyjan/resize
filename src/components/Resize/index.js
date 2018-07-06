import React from 'react';
import { isFunction } from 'lodash';
import { compose, pure, withHandlers, withState, lifecycle } from 'recompose';

import { bm, be } from '../../utils/bliss';
import './index.sass';

const MODULE_NAME = 'Resize';

const withResize = compose(
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
			setContentWidth(initWidth + event.clientX);
		},
	}),
	withHandlers({
		handleStopResize: ({
			contentRef,
			resizing,
			setResizing,
			onStopResize,

			handleResize,
		}) => (event) => {
			if (resizing) {
				if (isFunction(onStopResize)) {
					onStopResize({
						width: contentRef.style.width,
					});
				}
				setResizing(false);

				window.removeEventListener('mousemove', handleResize, false);
			}
		},
	}),
	withHandlers({
		handleStartResize: ({
			setInitWidth,
			setResizing,
			contentRef,

			handleResize,
			handleStopResize
		}) => (event) => {
			const startX = event.clientX;
			const startWidth = parseInt(contentRef.style.width);

			setInitWidth(startWidth - startX);
			setResizing(1);

			window.addEventListener('mousemove', handleResize, false);
			window.addEventListener('mouseup', handleStopResize, false);
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

const renderResize = ({
	children,
	handleStartResize,

	setContentRef,
	contentWidth = 100,
}) => (
	<div
		className={bm(MODULE_NAME)}
		style={{
			width: contentWidth,
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

export default Resize;
