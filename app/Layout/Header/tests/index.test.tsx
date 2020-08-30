import React from 'react';
import * as Redux from 'react-redux';
import { shallow } from 'enzyme';
import history from '@utils/history';
import * as actions from '@store/ui/actions';
import { LINKS } from '@utils/constants';
import Header from '../index';

jest.mock('store/ui/actions');

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as {}),
  useHistory: () => ({
    push: jest.fn(),
    listen: jest.fn(),
    location: { pathname: LINKS.home },
  }),
}));

describe('<Header />', () => {
  let useSelectorSpy: jest.SpyInstance;
  let useDispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    useSelectorSpy = jest.spyOn(Redux, 'useSelector');
    useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useSelectorSpy.mockReturnValue(jest.fn());
    useDispatchSpy.mockReturnValue(jest.fn());
  });

  const props = {
    scrollPosition: 0,
    locale: 'en',
    onLocaleToggle: jest.fn(),
    history,
    hovered: '',
    setHovered: jest.fn(),
    toggleMenu: jest.fn(),
    menuOpen: false,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<Header {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call changeLocale action on "de" locale link click', () => {
    const wrapper = shallow(<Header {...props} />);
    // link for "de" locale
    const link = wrapper.find('button').at(2);
    const newLocale = 'de';

    link.simulate('click');
    expect(actions.changeLocale).toHaveBeenCalledWith(newLocale);
    expect(actions.changeLocale).toHaveBeenCalledTimes(1);
  });

  it('should call changeLocale action on "en" locale link click', () => {
    const wrapper = shallow(<Header {...props} />);
    // link for "en" locale
    const link = wrapper.find('button').at(3);
    const newLocale = 'en';

    link.simulate('click');
    expect(actions.changeLocale).toHaveBeenCalledWith(newLocale);
    expect(actions.changeLocale).toHaveBeenCalledTimes(1);
  });

  it('should change the data-lang-hover attribute to the "de" locale', () => {
    const wrapper = shallow(<Header {...props} />);
    // link for "de" locale
    const link = wrapper.find('button').at(2);

    link.simulate('mouseEnter');
    expect(wrapper.find('[data-lang-hover="de"]').exists()).toBeTruthy();
  });

  it('should change the data-lang-hover attribute to the "en" locale', () => {
    const wrapper = shallow(<Header {...props} />);
    // link for "en" locale
    const link = wrapper.find('button').at(3);

    link.simulate('mouseEnter');
    expect(wrapper.find('[data-lang-hover="en"]').exists()).toBeTruthy();
  });

  it('should change the data-lang-hover attribute to the default locale on mouseLeave for "en" link', () => {
    // mock default value from store
    useSelectorSpy.mockReturnValue({ locale: 'someDefaultValue' });
    const wrapper = shallow(<Header {...props} />);
    // link for "de" locale
    const link = wrapper.find('button').at(2);

    link.simulate('mouseLeave');
    expect(wrapper.find('[data-lang-hover="someDefaultValue"]').exists()).toBeTruthy();
  });

  it('should change the data-lang-hover attribute to the default locale on mouseLeave for "de" link', () => {
    // mock default value from store
    useSelectorSpy.mockReturnValue({ locale: 'someDefaultValue' });
    const wrapper = shallow(<Header {...props} />);
    // link for "en" locale
    const link = wrapper.find('button').at(3);

    link.simulate('mouseLeave');
    expect(wrapper.find('[data-lang-hover="someDefaultValue"]').exists()).toBeTruthy();
  });

  it('should toggle menu when clicking the button', () => {
    // mock default value from store
    const wrapper = shallow(<Header {...props} />);
    const link = wrapper.find('button').first();

    link.simulate('click');
    expect(props.toggleMenu).toHaveBeenCalledWith(true);
    expect(props.toggleMenu).toHaveBeenCalledTimes(1);
  });
});
