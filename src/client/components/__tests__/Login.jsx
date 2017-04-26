import { URLSearchParams } from 'url';
import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';

import Login from '../Login';
import OauthRedirect from '../OauthRedirect';

describe('<Login />', () => {
  beforeAll(() => {
    window.URLSearchParams = URLSearchParams;
  });

  beforeEach(() => {
    window.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
  });

  it('should save the access token in localStorage if it is in the props', () => {
    const location = { search: '?access_token=test_access_token' };
    shallow(<Login location={location} />);
    expect(localStorage.setItem.mock.calls.length).toBe(1);
    expect(localStorage.setItem.mock.calls[0]).toEqual(['access_token', 'test_access_token']);
  });

  it('should not save the access token in localStorage if it is not in the props', () => {
    const location = { search: '' };
    shallow(<Login location={location} />);
    expect(localStorage.setItem.mock.calls.length).toBe(0);
  });

  it('should render a redirect to the home page if the access token is in localStorage', () => {
    window.localStorage.getItem = jest.fn().mockReturnValue('test_access_token');
    const location = { search: '' };
    const wrapper = shallow(<Login location={location} />);
    expect(wrapper.containsMatchingElement(<Redirect to="/" />)).toBe(true);
  });

  it('should render a redirect to the OAuth API if the access token is not in localStorage', () => {
    window.localStorage.getItem = jest.fn().mockReturnValue();
    const location = { search: '' };
    const wrapper = shallow(<Login location={location} />);
    expect(wrapper.containsMatchingElement(<OauthRedirect />)).toBe(true);
  });
});
