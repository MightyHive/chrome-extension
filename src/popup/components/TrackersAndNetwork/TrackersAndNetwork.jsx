import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

// Components
import TrackerList from './TrackerList';
import Network from './Network';

class TrackersAndNetwork extends Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
  }

  render() {
    const { trackers, trackerCount, networkCalls } = this.props.tab;

    return (
      <div>
        <Tabs>
          <Tab label="Trackers">
            <div className="tabContent">
              <TrackerList
                trackers={trackers}
                trackerCount={trackerCount}
              />
            </div>
          </Tab>
          <Tab label="Network">
            <div className="tabContent">
              <Network network={networkCalls} />
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default TrackersAndNetwork;
