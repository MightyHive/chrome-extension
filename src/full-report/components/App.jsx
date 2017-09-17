import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';

// Components
import DataLayers from './DataLayers/DataLayers';
import Trackers from './Trackers/Trackers';
import Network from './Network';

export default class App extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    successfulLoad: PropTypes.bool.isRequired,
    tab: PropTypes.object,
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
      <div className="reportApp">
        <div className="reportTitle">
          <h4>Full report for:</h4>
          <h6>{tab.currentURL}</h6>
        </div>
        <Tabs>
          <Tab label="Trackers">
            <Trackers
              trackers={tab.trackers}
              trackerCount={tab.trackerCount}
              network={tab.networkCalls}
            />
          </Tab>
          <Tab label="Data Layers">
            <DataLayers layers={tab.dataLayers} />
          </Tab>
          <Tab label="Network Activity">
            <Network
              currentURL={tab.currentURL}
              network={tab.networkCalls}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
