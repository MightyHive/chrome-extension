import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';

// Components
import DataLayers from './DataLayers';
import TrackerList from './TrackerList';
import NetworkCalls from './NetworkCalls';

class App extends Component {
  static propTypes = {
    currentURL: PropTypes.string.isRequired,
    layers: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    network: PropTypes.object.isRequired,
    trackers: PropTypes.object.isRequired,
    trackerCount: PropTypes.number.isRequired,
    successfulLoad: PropTypes.bool.isRequired,
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="center">
          <CircularProgress size={80} />
        </div>
      );
    }
    if (!this.props.successfulLoad) {
      return (
        <div className="center">
          <i className="icon icon-ic_play-circle_outline_black_24dp" /> Unable to load site data.
        </div>
      );
    }
    return (
      <div className="reportApp">
        <div className="reportTitle">
          <h4>Full report for:</h4>
          <h6>{this.props.currentURL}</h6>
        </div>
        <Tabs>
          <Tab label="Trackers">
            <div className="container">
              <h3 className="no-top-margin">Trackers</h3>
              <h6>Total Network Requests: {this.props.network.all.length}</h6>
              <TrackerList
                trackers={this.props.trackers}
                trackerCount={this.props.trackerCount}
              />
            </div>
          </Tab>
          <Tab label="Data Layers">
            <DataLayers layers={this.props.layers} />
          </Tab>
          <Tab label="Network Activity">
            <div className="container">
              <h3 className="no-top-margin">Total Network Requests: {this.props.network.all.length}</h3>
              <NetworkCalls
                network={this.props.network}
                currentURL={this.props.currentURL}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;
