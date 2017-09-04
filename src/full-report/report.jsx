import * as queryString from 'query-string';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppCSS from '../styles/index.scss';

import * as util from '../chrome.utils';

const parsedQuery = queryString.parse(window.location.search);

let tab = {
  tabId: null,
  currentURL: null,
  dataLayers: [],
  networkCalls: {
    all: [],
    tabContent: [],
  },
  trackers: {},
  trackerCount: 0,
};

let loading = true;
let successfulLoad = false;

function renderApp() {
  ReactDOM.render(
    <MuiThemeProvider>
      <App
        currentURL={tab.currentURL}
        tabId={tab.tabId}
        layers={tab.dataLayers}
        network={tab.networkCalls}
        trackers={tab.trackers}
        trackerCount={tab.trackerCount}
        successfulLoad={successfulLoad}
        loading={loading}
      />
    </MuiThemeProvider>,
    document.getElementById('app'));
}

// Pull tab data from Background
util.getTabData(parsedQuery.id).then((data) => {
  tab = data;
  if (data) {
    successfulLoad = true;
  }
  loading = false;
  renderApp();
});

renderApp();
injectTapEventPlugin();
