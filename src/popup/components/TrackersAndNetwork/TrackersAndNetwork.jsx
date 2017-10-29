import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

// Components
import TrackerList from './TrackerList';
import Network from './Network';

const TrackersAndNetwork = ({ tab }) => {
  const { trackers, trackerCount, networkCalls } = tab;

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
};

TrackersAndNetwork.propTypes = {
  tab: PropTypes.object.isRequired,
};

export default TrackersAndNetwork;
