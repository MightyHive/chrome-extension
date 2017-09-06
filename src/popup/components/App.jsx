import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {
  static propTypes = {
    getActiveTabData: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      tab: undefined,
      loading: true,
      successfulLoad: false,
    };
    this.openReport = this.openReport.bind(this);

    // Cache helpers to reduce rendering
    this.timesCheckedForUpdate = 0;
    this.lastModifiedTimestamp = null;
  }

  componentDidMount() {
    this.props.getActiveTabData()
      .then((data) => {
        if (data) {
          this.setState({
            tab: data,
            successfulLoad: true,
            loading: false,
          });
          this.lastModifiedTimestamp = data._lastModified;
          setTimeout(this.checkForUpdate.bind(this), 100);
        } else {
          this.setState({
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.error('Error retrieving tab data', error);
        this.setState({
          loading: false,
        });
      });
  }

  checkForUpdate() {
    let timeoutDuration = 100;

    // If it's been open 6 seconds
    if (this.timesToCheckForUpdate > 60) {
      timeoutDuration = 250;
    }

    // If it's been open 30 seconds
    if (this.timesToCheckForUpdate > 60) {
      timeoutDuration = 500;
    }

    this.props.getActiveTabData(this.lastModifiedTimestamp)
      .then((data) => {
        if (data) {
          this.setState({
            tab: data,
          });
          this.lastModifiedTimestamp = data._lastModified;
        }

        this.timesCheckedForUpdate += 1;
        setTimeout(this.checkForUpdate.bind(this), timeoutDuration);
      })
      .catch((error) => {
        console.error('Error retrieving tab data', error);
      });
  }

  openReport() {
    chrome.tabs.create({ url: `/full-report.html?id=${this.state.tab.tabId}` });
  }

  render() {
    const { loading, successfulLoad, tab } = this.state;

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
