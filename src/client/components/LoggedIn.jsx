import React from 'react';
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

const LoggedIn = () => {
  if (!localStorage.getItem('access_token')) {
    return <OauthRedirect />;
  }

  return (
    <div style={styles.container}>
      <Posts />
    </div>
  );
};

export default Radium(LoggedIn);
