import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import LayersList from './LayersList';

class App extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
    network: PropTypes.object.isRequired,
    tabId: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.openReport = this.openReport.bind(this);
  }

  openReport() {
    chrome.tabs.create({ url: `/full-report.html?id=${this.props.tabId}` });
  }

  render() {
    return (
      <div className="App">
        <div className="mdl-cell mdl-cell--12-col">
          <h3>Data Layers</h3>
          <LayersList layers={this.props.layers} />
        </div>

        <div className="mdl-card mdl-shadow--2dp network-card">
          <h6>Total Network Requests</h6>
          <h3>{this.props.network.all.length}</h3>
        </div>

        <div className="center">
          <button
            onClick={this.openReport}
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          >View Full Report
          </button>
        </div>
      </div>
    );
  }
}

export default App;
