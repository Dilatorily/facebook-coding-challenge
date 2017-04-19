import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import OauthRedirect from './OauthRedirect';
import Posts from './Posts';

const styles = {
  container: {
    maxWidth: 510,
    margin: '0 auto',
    '@media only screen and (max-width: 534px)': {
      padding: '0 12px',
    },
  },
};

const LoggedIn = ({ appId }) => {
  if (!localStorage.getItem('access_token')) {
    return <OauthRedirect />;
  }

  return (
    <div style={styles.container}>
      <Posts appId={appId} />
    </div>
  );
};

LoggedIn.propTypes = {
  appId: PropTypes.string.isRequired,
};

export default Radium(LoggedIn);
