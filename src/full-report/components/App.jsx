import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';
import * as url from 'url';

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

    const parsedUrl = url.parse(tab.currentURL);
    const pathname = parsedUrl.pathname === '/' ? '' : parsedUrl.pathname;

    return (
      <div className="reportApp">
        <div className="heroContainer">
          <div className="hero">
            <h3 className="reportTitle">Full report</h3>
            <h5 className="reportUrl">{parsedUrl.host + pathname}</h5>
          </div>
        </div>
        <Tabs className="dashboard">
          <Tab label="Trackers" className="reportTab">
            <Trackers
              trackers={tab.trackers}
              trackerCount={tab.trackerCount}
              network={tab.networkCalls}
            />
          </Tab>
          <Tab label="Data Layers" className="reportTab">
            <DataLayers layers={tab.dataLayers} />
          </Tab>
          <Tab label="Network Activity" className="reportTab">
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
