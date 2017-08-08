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
        <h3>Data Layers</h3>
        <LayersList layers={this.props.layers} />

        <h3>Total Network Requests:</h3>
        <div>{this.props.network.all.length}</div>

        <button onClick={this.openReport}>View Full Report</button>
      </div>
    );
  }
}

export default App;
