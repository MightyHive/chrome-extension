import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppCSS from '../styles/index.scss';

// Data Layer Importers
import * as util from '../chrome.utils';

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

function renderApp() {
  ReactDOM.render(
    <MuiThemeProvider>
      <App
        tabId={tab.tabId}
        tab={tab}
        currentURL={tab.currentURL}
        layers={tab.dataLayers}
        network={tab.networkCalls}
        trackerCount={tab.trackerCount}
      />
    </MuiThemeProvider>,
    document.getElementById('app'));
}

// Pull tab data from Background
util.getActiveTabData().then((data) => {
  tab = data;
  renderApp();
});

renderApp();
injectTapEventPlugin();
