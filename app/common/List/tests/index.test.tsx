import React from 'react';
import { shallow } from 'enzyme';
import List from '../index';

describe('<List />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<List items={[{ id: '1', content: 'some content' }]} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when icon is provided', () => {
    const wrapper = shallow(<List items={[{ id: '1', content: 'some content' }]} />);

    expect(wrapper).toMatchSnapshot();
  });
});
