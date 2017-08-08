import * as queryString from 'query-string';
import 'material-design-lite/material';
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

function renderApp() {
  ReactDOM.render(
    <App
      tabId={tab.tabId}
      layers={tab.dataLayers}
      network={tab.networkCalls}
    />,
    document.getElementById('app'));
}

// Pull tab data from Background
util.getTabData(parsedQuery.id).then((data) => {
  tab = data;
  renderApp();
});

renderApp();
