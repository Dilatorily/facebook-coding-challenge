import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { StyleRoot } from 'radium';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';

injectTapEventPlugin();

const root = document.getElementById('root');
const renderComponent = Component => render(
  <AppContainer>
    <StyleRoot>
      <BrowserRouter>
        <MuiThemeProvider>
          <Component />
        </MuiThemeProvider>
      </BrowserRouter>
    </StyleRoot>
  </AppContainer>,
  root,
);

renderComponent(App);
if (module.hot) {
  module.hot.accept('./components/App', () => renderComponent(App));
}
