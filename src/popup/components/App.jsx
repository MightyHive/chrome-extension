import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

// Components
import LayersList from './LayersList';

class App extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
    currentUrl: PropTypes.string.isRequired,
    tab: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
    tabId: PropTypes.number.isRequired,
    trackerCount: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.openReport = this.openReport.bind(this);
  }

  openReport() {
    chrome.tabs.create({ url: `/full-report.html?id=${this.props.tabId}` });
  }

  render() {
    const { tab } = this.props;
    return (
      <div className="App">
        <div className="container">
          <div className="trackerCount">
            <div className="content">
              {this.props.trackerCount}
            </div>
            <div className="heading">
              <h3>Trackers</h3>
            </div>
          </div>
          <div className="halfColumn subData">
            <h3>Data Layers</h3>
            <span className="data">{this.props.layers.length}</span>
          </div>
          <div className="halfColumn subData">
            <h3>Network Calls</h3>
            <span className="data">{this.props.network.all.length}</span>
          </div>

          <RaisedButton
            label="View Full Report"
            backgroundColor="#183063"
            labelColor="#ffb50b"
            fullWidth
            onClick={this.openReport}
            labelStyle={{ fontFamily: 'Roboto Bold' }}
            style={{ marginTop: '20px' }}
          />
        </div>
      </div>
    );
  }
}

export default App;
