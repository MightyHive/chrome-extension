import * as queryString from 'query-string';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppCSS from '../styles/index.scss';

import * as util from '../popup/utils';

const parsedQuery = queryString.parse(window.location.search);

let tab = {
  tabId: null,
  currentURL: null,
  dataLayers: [],
  networkCalls: {
    all: [],
    tabContent: [],
  },
};

let successfulLoad = false;

function renderApp() {
  ReactDOM.render(
    <MuiThemeProvider>
      <App
        tabId={tab.tabId}
        layers={tab.dataLayers}
        network={tab.networkCalls}
        successfulLoad={successfulLoad}
      />
    </MuiThemeProvider>,
    document.getElementById('app'));
  injectTapEventPlugin();
}

// Pull tab data from Background
util.getTabData(parsedQuery.id).then((data) => {
  tab = data;
  successfulLoad = true;
  renderApp();
});

renderApp();
