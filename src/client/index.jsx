import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { StyleRoot } from 'radium';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

const root = document.getElementById('root');
const renderComponent = Component => render(
  <AppContainer>
    <StyleRoot>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </StyleRoot>
  </AppContainer>,
  root,
);

renderComponent(App);
if (module.hot) {
  module.hot.accept('./components/App', () => renderComponent(App));
}
