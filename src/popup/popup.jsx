import 'material-design-lite/material';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppCSS from '../styles/index.scss';

// Data Layer Importers
import * as util from '../utils';

let dataLayers = [];

function renderApp() {
  ReactDOM.render(<App layers={dataLayers} />, document.getElementById('app'));
}

// Contact the active tab and load its data
util.sendActiveTabMessage({
  type: 'dataLayers',
}, (response) => {
  if (response) {
    dataLayers = response;
    renderApp();
  }
});

renderApp();
