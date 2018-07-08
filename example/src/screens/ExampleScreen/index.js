import React, { Fragment } from 'react';
import { compose, pure, withHandlers, withState } from 'recompose';

import { bm, be } from 'resize/lib/utils/bliss';
import Resize from 'resize/lib/components/Resize';

import Button from 'components/Button';
import ExampleWrapper from 'components/ExampleWrapper';
import ExampleFill from 'components/ExampleFill';

import image from './img/example.jpg';
import './index.sass';


const MODULE_NAME = 'ExampleScreen';

const TABS = {
	FULL: 'full',
	ABSOLUTE: 'absolute',
	RELATIVE: 'relative',
};

const tabsMenuItems = [
	{
		id: TABS.FULL,
		title: 'Full',
	},
	{
		id: TABS.ABSOLUTE,
		title: 'Absolute',
	},
	{
		id: TABS.RELATIVE,
		title: 'Relative',
	},
];

const withExampleScreen = compose(
	withState('activeTab', 'setActiveTab', TABS.FULL),
	withHandlers({
		handleSelectTab: ({ activeTab, setActiveTab }) => (event) => {
			setActiveTab(event.currentTarget.value)
		},
	}),
	pure,
);

const renderExampleScreen = ({
	activeTab,
	handleSelectTab,
}) => (
	<div className={bm(MODULE_NAME)}>
		<div className={be(MODULE_NAME, 'header')}>
			<h1>Resize examples</h1>

			<div className="btn-group" role="group">
				{tabsMenuItems.map((item) => (
					<Button
						key={item.id}
						type="button"
						isActive={activeTab === item.id}
						onClick={handleSelectTab}
						value={item.id}
					>
						{item.title}
					</Button>
				))}
			</div>
		</div>

		<div className={be(MODULE_NAME, 'content')}>
			{activeTab === TABS.ABSOLUTE && (
				<Fragment>
					<ExampleWrapper absolute>
						<Resize>
							<ExampleFill />
							<pre>
								&lt;Resize&nbsp;/&gt;
							</pre>
						</Resize>
					</ExampleWrapper>

					<ExampleWrapper absolute style={{ top: 150 }}>
						<Resize
							width={250}
							maxWidth={'80%'}
							minWidth={'20%'}
						>
							<ExampleFill />
							<pre>
								&lt;Resize
								<br />
								&nbsp;&nbsp;width=&#123;250&#125;
								<br />
								&nbsp;&nbsp;maxWidth=&#123;'80%'&#125;
								<br />
								&nbsp;&nbsp;minWidth=&#123;'20%'&#125;
								<br />
								/&gt;
							</pre>
						</Resize>
					</ExampleWrapper>

					<ExampleWrapper absolute style={{ top: 300 }}>
						<Resize
							width={'50%'}
						>
							<ExampleFill />
							<pre>
								&lt;Resize
								<br />
								&nbsp;&nbsp;width=&#123;'50%'&#125;
								<br />
								/&gt;
							</pre>
						</Resize>
					</ExampleWrapper>
					<img src={image} alt="" style={{ width: '100%' }} />
				</Fragment>
			)}
			{activeTab === TABS.RELATIVE && (
				<Fragment>
					<ExampleWrapper>
						<Resize width={700}>
							<div style={{ position: 'absolute' }}>
								<pre>
									&lt;Resize
									<br />
									&nbsp;&nbsp;width=&#123;700&#125;
									<br />
									/&gt;
								</pre>
							</div>
							<img src={image} alt="" style={{ width: '100%' }} />
						</Resize>
					</ExampleWrapper>
					<ExampleWrapper>
						<Resize width={300}>
							<div style={{ position: 'absolute' }}>
								<pre>
									&lt;Resize
									<br />
									&nbsp;&nbsp;width=&#123;300&#125;
									<br />
									/&gt;
								</pre>
							</div>
							<img src={image} alt="" style={{ width: '100%' }} />
						</Resize>
					</ExampleWrapper>
					<div className="clearfix"></div>
				</Fragment>
			)}

			{activeTab === TABS.FULL && (
				<Fragment>
					<ExampleWrapper absolute style={{ height: '100%' }}>
						<Resize
							onStopResize={(props) => { console.log(props) }}
							width={'50%'}
						>
							<ExampleFill />
							<pre>
								&lt;Resize
								<br />
								&nbsp;&nbsp;onStopResize=&#123;(props) => &#123; console.log(props) &#125;&#125;
								<br />
								&nbsp;&nbsp;width=&#123;'50%'&#125;
								<br />
								/&gt;
							</pre>
						</Resize>
					</ExampleWrapper>
					<img src={image} alt="" style={{ width: '100%' }} />
				</Fragment>
			)}
		</div>
	</div>
);

const ExampleScreen = withExampleScreen(renderExampleScreen);

export default ExampleScreen;
