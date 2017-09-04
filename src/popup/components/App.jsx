import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

// Components
import LayersList from './LayersList';

class App extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    successfulLoad: PropTypes.bool.isRequired,
    tab: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.openReport = this.openReport.bind(this);
  }

  openReport() {
    chrome.tabs.create({ url: `/full-report.html?id=${this.props.tab.tabId}` });
  }

  render() {
    const { loading, successfulLoad, tab } = this.props;

    if (loading) {
      return (
        <div className="center">
          <CircularProgress size={80} />
        </div>
      );
    }

    if (!successfulLoad || !tab) {
      return (
        <div className="center">
          <i className="icon icon-ic_play-circle_outline_black_24dp" /> Unable to load site data.
        </div>
      );
    }

    return (
      <div className="App">
        <div className="container">
          <div className="trackerCount">
            <div className="content">
              {tab.trackerCount}
            </div>
            <div className="heading">
              <h4 className="thin">Trackers</h4>
            </div>
          </div>
          <div className="halfColumn subData">
            <h5>Data Layers</h5>
            <span className="data">{tab.dataLayers.length}</span>
          </div>
          <div className="halfColumn subData">
            <h5>Network Calls</h5>
            <span className="data">{tab.networkCalls.all.length}</span>
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
