import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {
  static propTypes = {
    activeTabConnection: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      tab: undefined,
      loading: true,
      successfulLoad: false,
    };
    this.openReport = this.openReport.bind(this);
  }

  componentDidMount() {
    try {
      this.props.activeTabConnection((message) => {
        if (message.data && !message.error) {
          this.setState({
            tab: message.data,
            successfulLoad: true,
            loading: false,
          });
        }

        if (message.error) {
          this.setState({
            successfulLoad: false,
            loading: false,
          });
        }
      });
    } catch (e) {
      console.error('Error initiating UI: ', e);
    }
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
              {tab.trackerCount || 0}
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
