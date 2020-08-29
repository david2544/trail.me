import React from 'react';
import { shallow } from 'enzyme';

import Router from '@app/Router';

describe('<Router />', () => {
  it('should render and match the snapshot', () => {
    const wrapper = shallow(<Router />);

    expect(wrapper).toMatchSnapshot();
  });
});
