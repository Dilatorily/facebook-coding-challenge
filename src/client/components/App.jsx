import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoggedIn from './LoggedIn';
import Login from './Login';
import NavBar from './NavBar';
import OauthRedirect from './OauthRedirect';

const styles = {
  container: {
    minHeight: '100vh',
  },
  content: {
    paddingTop: 12,
  },
};

const App = () => (
  <div style={styles.container}>
    <NavBar />
    <div style={styles.content}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={LoggedIn} />
        <Route component={OauthRedirect} />
      </Switch>
    </div>
  </div>
);

export default App;
