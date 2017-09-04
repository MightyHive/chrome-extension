import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';

// Components
import DataLayers from './DataLayers';
import TrackerList from './TrackerList';
import Network from './Network';

class App extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    successfulLoad: PropTypes.bool.isRequired,
    tab: PropTypes.object.isRequired,
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
            <div className="container">
              <h3 className="no-top-margin">Trackers</h3>
              <h6>Total Network Requests: {tab.networkCalls.all.length}</h6>
              <TrackerList
                trackers={tab.trackers}
                trackerCount={tab.trackerCount}
              />
            </div>
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

export default App;
