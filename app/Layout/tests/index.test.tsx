import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../index';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as {}),
  useHistory: () => ({
    listen: jest.fn().mockImplementationOnce(cb => {
      cb({ pathname: '/' });
    }),
    location: { pathname: '/' },
  }),
}));

describe('<Layout />', () => {
  const setState = jest.fn();
  const useStateMock: any = () => [true, setState];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<Layout>children</Layout>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should toggle menu to false when location changes', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    shallow(<Layout>children</Layout>);
    expect(setState).toHaveBeenCalledWith(false);
  });
});
