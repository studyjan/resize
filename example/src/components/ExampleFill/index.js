import React, { Fragment } from 'react';
import { compose, pure, withHandlers, withState } from 'recompose';

import { bm } from 'resize/lib/utils/bliss';

import './index.sass';


const MODULE_NAME = 'ExampleFill';

const withExampleFill = compose(
	pure,
);

const renderExampleFill = () => (
	<div className={bm(MODULE_NAME)} />
);

const ExampleFill = withExampleFill(renderExampleFill);

ExampleFill.propTypes = {};

export default ExampleFill;
