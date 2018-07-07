import React, { Fragment } from 'react';
import T from 'prop-types';
import { compose, pure, withHandlers, withState } from 'recompose';

import { bm } from 'resize/lib/utils/bliss';

import './index.sass';


const MODULE_NAME = 'Button';

const withButton = compose(
	pure,
);

const renderButton = ({
	children,
	isActive,
	...otherProps,
}) => (
	<button className={bm(MODULE_NAME, null, { isActive })} { ...otherProps }>
		{children}
	</button>
);

const Button = withButton(renderButton);

Button.propTypes = {
	isActive: T.bool,
};

export default Button;
