import * as queryString from 'query-string';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// Import App CSS
import '../styles/index.scss';

import * as util from '../chrome.utils';

const parsedQuery = queryString.parse(window.location.search);

ReactDOM.render(
  <MuiThemeProvider>
    <App
      tabConnection={util.tabConnection}
      tabId={parsedQuery.id}
    />
  </MuiThemeProvider>,
  document.getElementById('app'));

injectTapEventPlugin();
