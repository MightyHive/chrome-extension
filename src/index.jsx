import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import AppCSS from './styles/index.scss';

const fakeData = [
  {
    name: 'Google Tag Manager',
  },
  {
    name: 'Tealium',
  },
];

ReactDOM.render(<App layers={fakeData} />, document.getElementById('app'));
