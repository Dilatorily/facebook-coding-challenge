import React from 'react';
import Radium from 'radium';
import { shallow } from 'enzyme';

import NavBar from '../NavBar';

describe('<NavBar />', () => {
  beforeAll(() => {
    Radium.TestMode.enable();
  });

  it('should render the Facebook icon', () => {
    const wrapper = shallow(<NavBar appId="testApplicationId" />);
    expect(wrapper.containsMatchingElement(
      <span
        style={{
          backgroundImage: 'url(test-file-stub)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '26px 772px',
          backgroundPosition: '0 -13px',
          display: 'inline-block',
          height: 24,
          width: 24,
        }}
      />,
    )).toBe(true);
  });

  it('should render a link to the page', () => {
    const wrapper = shallow(<NavBar appId="testApplicationId" />);
    expect(wrapper.containsMatchingElement(
      <a href="https://www.facebook.com/testApplicationId"><span /></a>,
    )).toBe(true);
  });
});
