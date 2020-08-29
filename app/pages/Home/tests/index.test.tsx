import React from 'react';
import * as Redux from 'react-redux';
import { shallow } from 'enzyme';
import * as actions from '@store/ui/actions';
import Home from '..';

jest.mock('store/ui/actions');

describe('<Home />', () => {
  let useSelectorSpy: jest.SpyInstance;
  let useDispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    useSelectorSpy = jest.spyOn(Redux, 'useSelector');
    useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useSelectorSpy.mockReturnValue(jest.fn());
    useDispatchSpy.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call changeLocale action on "de" locale link click', () => {
    const wrapper = shallow(<Home />);
    // link for "de" locale
    const link = wrapper.find('a').first();
    const newLocale = 'de';

    link.simulate('click');
    expect(actions.changeLocale).toHaveBeenCalledWith(newLocale);
  });

  it('should call changeLocale action on "en" locale link click', () => {
    const wrapper = shallow(<Home />);
    // link for "en" locale
    const link = wrapper.find('a').at(1);
    const newLocale = 'en';

    link.simulate('click');
    expect(actions.changeLocale).toHaveBeenCalledWith(newLocale);
  });

  it('should change the data-lang-hover attribute to the "de" locale', () => {
    const wrapper = shallow(<Home />);
    // link for "de" locale
    const link = wrapper.find('a').first();

    link.simulate('mouseEnter');
    expect(wrapper.find('[data-lang-hover="de"]').exists()).toBeTruthy();
  });

  it('should change the data-lang-hover attribute to the "en" locale', () => {
    const wrapper = shallow(<Home />);
    // link for "en" locale
    const link = wrapper.find('a').at(1);

    link.simulate('mouseEnter');
    expect(wrapper.find('[data-lang-hover="en"]').exists()).toBeTruthy();
  });

  it('should change the data-lang-hover attribute to the default locale on mouseLeave for "en" link', () => {
    // mock default value from store
    useSelectorSpy.mockReturnValue({ locale: 'someDefaultValue' });
    const wrapper = shallow(<Home />);
    // link for "de" locale
    const link = wrapper.find('a').first();

    link.simulate('mouseLeave');
    expect(wrapper.find('[data-lang-hover="someDefaultValue"]').exists()).toBeTruthy();
  });

  it('should change the data-lang-hover attribute to the default locale on mouseLeave for "de" link', () => {
    // mock default value from store
    useSelectorSpy.mockReturnValue({ locale: 'someDefaultValue' });
    const wrapper = shallow(<Home />);
    // link for "en" locale
    const link = wrapper.find('a').at(1);

    link.simulate('mouseLeave');
    expect(wrapper.find('[data-lang-hover="someDefaultValue"]').exists()).toBeTruthy();
  });
});
