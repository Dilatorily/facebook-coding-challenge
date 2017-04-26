import React from 'react';
import Radium from 'radium';
import { shallow } from 'enzyme';

import LoggedIn from '../LoggedIn';
import OauthRedirect from '../OauthRedirect';
import Posts from '../Posts';

describe('<LoggedIn />', () => {
  beforeAll(() => {
    Radium.TestMode.enable();
  });

  afterAll(() => {
    Radium.TestMode.disable();
  });

  it('should render a OauthRedirect if the access token is not in the localStorage', () => {
    window.localStorage = {
      getItem: jest.fn().mockReturnValue(),
    };
    const wrapper = shallow(<LoggedIn appId="testApplicationId" />);
    expect(wrapper.containsMatchingElement(<OauthRedirect />)).toBe(true);
  });

  it('should render a list of posts if the access token is in the localStorage', () => {
    window.localStorage = {
      getItem: jest.fn().mockReturnValue('test_access_token'),
    };

    const wrapper = shallow(<LoggedIn appId="testApplicationId" />);
    expect(wrapper.containsMatchingElement(<Posts appId="testApplicationId" />)).toBe(true);
  });
});
