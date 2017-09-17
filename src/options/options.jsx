import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppCSS from '../styles/index.scss';

// Data Layer Importers
import * as util from '../chrome.utils';

ReactDOM.render(
  <MuiThemeProvider>
    <App
      getFromStorage={util.getFromStorage}
      saveToStorage={util.saveToStorage}
    />
  </MuiThemeProvider>,
  document.getElementById('app'));

injectTapEventPlugin();
