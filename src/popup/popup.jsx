import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// Import App CSS
import '../styles/index.scss';

import * as util from '../chrome.utils';

const theme = {
  appBar: {
    height: 60,
    color: '#FFFFFF',
    textColor: '#000000',
  },
};

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <App
      activeTabConnection={util.activeTabConnection}
    />
  </MuiThemeProvider>,
  document.getElementById('app'));

injectTapEventPlugin();
