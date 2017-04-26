import React from 'react';
import { shallow } from 'enzyme';

import OauthRedirect from '../OauthRedirect';

describe('<OauthRedirect />', () => {
  let assign;

  beforeAll(() => {
    assign = window.location.assign;
  });

  beforeEach(() => {
    window.location.assign = jest.fn();
  });

  afterAll(() => {
    window.location.assign = assign;
  });

  it('should redirect to the OAuth API', () => {
    shallow(<OauthRedirect />);
    expect(window.location.assign.mock.calls.length).toBe(1);
    expect(window.location.assign.mock.calls[0]).toEqual(['/api/oauth']);
  });

  it('should render nothing', () => {
    const wrapper = shallow(<OauthRedirect />);
    expect(wrapper.type()).toBe(null);
  });
});
