import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import OauthRedirect from './OauthRedirect';

class Login extends React.PureComponent {
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const accessToken = query.get('access_token');
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    }
  }

  render() {
    if (localStorage.getItem('access_token')) {
      return <Redirect to="/" />;
    }

    return <OauthRedirect />;
  }
}

Login.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default Login;
