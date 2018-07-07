import React, { Fragment } from 'react';
import T from 'prop-types';
import { compose, pure, withHandlers, withState } from 'recompose';

import { bm } from 'resize/lib/utils/bliss';

import './index.sass';


const MODULE_NAME = 'ExampleWrapper';

const withExampleWrapper = compose(
	pure,
);

const renderExampleWrapper = ({
	children,
	absolute,
	style,
}) => (
	<div className={bm(MODULE_NAME, { absolute })} style={style}>
		{children}
	</div>
);

const ExampleWrapper = withExampleWrapper(renderExampleWrapper);

ExampleWrapper.propTypes = {
	absolute: T.bool,
	style: T.object,
};

export default ExampleWrapper;
