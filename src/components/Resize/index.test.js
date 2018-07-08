import React from 'react';
import Resize from './index';
import { shallow, mount } from 'enzyme';


describe('Resize component', () => {
	it('renders without crashing', () => {
		shallow(<Resize />);
	});

	it('basic rendered class check', () => {
		const wrapper = mount(<Resize />);
		const classCheck = [
			'.Resize',
			'.Resize-content',
			'.Resize-handle',
		];

		const countOfClass = classCheck.reduce((acc, item) => {
			return acc + wrapper.find(item).length
		}, 0);

		expect(countOfClass).toEqual(3);
	});

	it('rendered class check - resizing', () => {
		const wrapper = mount(<Resize />);

		expect(wrapper.find('.Resize--resizing').length).toEqual(0);
	});

	it('props check external class', () => {
		const wrapper = mount(<Resize className="testClassName" />);

		expect(wrapper.props().className).toEqual('testClassName');
	});

	it('rendered class check external class', () => {
		const wrapper = mount(<Resize className="testClassName" />);

		expect(wrapper.find('.Resize.testClassName').length).toEqual(1);
	});

	it('rendered class check during resizing', () => {
		const callback = jest.fn();
		const wrapper = mount(<Resize onStopResize={callback} />);

		wrapper.find('.Resize-handle').first().simulate('mousedown', { nativeEvent: { which: 1 } });

		expect(wrapper.find('.Resize--resizing').length).toEqual(1);
	});

	it('call callback check', () => {
		const callback = jest.fn();
		const wrapper = mount(<Resize onStopResize={callback} />);

		wrapper.find('.Resize-handle').first().simulate('mousedown', { nativeEvent: { which: 1 } });
		global.window.dispatchEvent(new Event('mouseup'));

		expect(callback).toBeCalledWith({"height": 0, "width": 0})
	});
});
