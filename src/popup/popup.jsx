import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// Import App CSS
import '../styles/index.scss';

import * as util from '../chrome.utils';

ReactDOM.render(
  <MuiThemeProvider>
    <App
      activeTabConnection={util.activeTabConnection}
    />
  </MuiThemeProvider>,
  document.getElementById('app'));

injectTapEventPlugin();
// Request data layers be updated if polling is finished
util.sendActiveTabMessage({ type: 'updateDataLayers' });
