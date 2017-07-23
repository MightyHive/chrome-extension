import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import AppCSS from './styles/index.scss';

// Data Layer Importers
import * as util from './utils';

// Contact the active tab and load its data
util.sendActiveTabMessage({
  type: 'dataLayers',
}, (response) => {
  console.log('Response received from client.', response);
  let dataLayers = [];
  if (response && response.data) {
    dataLayers = response.data;
  }
  ReactDOM.render(<App layers={dataLayers} />, document.getElementById('app'));
});

