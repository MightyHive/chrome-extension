import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppCSS from '../styles/index.scss';

// Data Layer Importers
import * as util from '../chrome.utils';

let tab;
let loading = true;
let successfulLoad = false;

function renderApp() {
  ReactDOM.render(
    <MuiThemeProvider>
      <App
        tab={tab}
        successfulLoad={successfulLoad}
        loading={loading}
      />
    </MuiThemeProvider>,
    document.getElementById('app'));
}

// Pull tab data from Background
util.getActiveTabData()
  .then((data) => {
    tab = data;
    if (data) {
      successfulLoad = true;
    }
    loading = false;
    renderApp();
  })
  .catch((error) => {
    console.error('Error retrieving tab data', error);
    loading = false;
    renderApp();
  });

renderApp();
injectTapEventPlugin();
