import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoggedIn from './LoggedIn';
import Login from './Login';
import NavBar from './NavBar';
import OauthRedirect from './OauthRedirect';
import { get } from '../utils';

const styles = {
  container: {
    minHeight: '100vh',
  },
  content: {
    paddingTop: 12,
  },
};

class App extends React.PureComponent {
  state = { id: '' }

  async componentWillMount() {
    const { id } = await get('/api/id');
    this.setState({ id });
  }

  render() {
    return (
      <div style={styles.container}>
        <NavBar appId={this.state.id} />
        <div style={styles.content}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" render={() => <LoggedIn appId={this.state.id} />} />
            <Route component={OauthRedirect} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
