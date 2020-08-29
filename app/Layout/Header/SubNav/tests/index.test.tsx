import React from 'react';
import { shallow } from 'enzyme';
import SubNav from '../index';

describe('<SubNav />', () => {
  it('should match snapshot', () => {
    const props = {
      subMenuItem: {
        link: 'some string',
        title: 'some string',
        description: 'some string',
        isExternal: false,
      },
    };

    const wrapper = shallow(<SubNav {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const props = {
      subMenuItem: {
        link: 'some string',
        title: 'some string',
        titleSub: 'some string',
        description: 'some string',
        isExternal: true,
      },
    };

    const wrapper = shallow(<SubNav {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
