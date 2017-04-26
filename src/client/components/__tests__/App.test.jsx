import React from 'react';
import { shallow } from 'enzyme';
import { Route, Switch } from 'react-router-dom';

import App from '../App';
import LoggedIn from '../LoggedIn';
import Login from '../Login';
import NavBar from '../NavBar';
import OauthRedirect from '../OauthRedirect';
import * as Utils from '../../utils';

describe('<App />', () => {
  beforeEach(() => {
    Utils.get = jest.fn().mockReturnValue(new Promise(resolve => resolve({ id: 'testApplicationId' })));
  });

  it('should GET the application ID', () => {
    shallow(<App />);
    expect(Utils.get.mock.calls.length).toBe(1);
    expect(Utils.get.mock.calls[0]).toEqual(['/api/id']);
  });

  it('should update the state of the component to contain the application ID', async () => {
    const wrapper = shallow(<App />);
    await wrapper.update();
    expect(wrapper.state().id).toBe('testApplicationId');
  });

  describe('after componentWillMount', () => {
    let wrapper;
    beforeEach(async () => {
      wrapper = shallow(<App />);
      await wrapper.update();
    });

    it('should render a NavBar', () => {
      expect(wrapper.containsMatchingElement(<NavBar appId="testApplicationId" />)).toBe(true);
    });

    it('should render a react-router-dom\'s Switch Component with the Routes', () => {
      expect(wrapper.containsMatchingElement(
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" />
          <Route component={OauthRedirect} />
        </Switch>,
      )).toBe(true);
    });

    it('should render the LoggedIn component', () => {
      const Component = wrapper.instance().renderLoggedIn;
      const component = shallow(<Component />);
      expect(component.containsMatchingElement(<LoggedIn appId="testApplicationId" />)).toBe(true);
    });
  });
});
