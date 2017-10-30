import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';

import NetworkCallConfig from '../../../../config/network-call.config';
import TrackerGroup from './TrackerGroup';

const TrackerListItem = ({ trackerCalls, trackerId }) => {
  const trackerData = NetworkCallConfig.trackerData[trackerId];

  if (trackerData) {
    return (
      <ListItem
        primaryText={`${trackerData.displayName} (${trackerCalls.length})`}
        primaryTogglesNestedList
        nestedItems={[(
          <TrackerGroup
            trackers={trackerCalls}
          />
        )]}
      />
    );
  }
  return (<span style={{ display: 'none' }}>Tracker data not found for ID {trackerId}</span>);
};

TrackerListItem.propTypes = {
  trackerCalls: PropTypes.array.isRequired,
  trackerId: PropTypes.string.isRequired,
};

export default TrackerListItem;
