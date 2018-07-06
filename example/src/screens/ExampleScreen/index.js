import React, { Fragment } from 'react';

import Resize from 'resize/lib/components/Resize';

import image from './img/1962859_597214933693361_1721509206_n.jpg';

const ExampleScreen = () => (
	<Fragment>
		<div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
			<Resize
				onStopResize={
					({ width }) => {
						console.debug(width)
					}
				}
			>
				<div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(255, 0, 0, .25)' }}></div>
			</Resize>
		</div>
		<img src={image} alt="" style={{ width: '100%', height: '100%' }} />
	</Fragment>
);

export default ExampleScreen;
