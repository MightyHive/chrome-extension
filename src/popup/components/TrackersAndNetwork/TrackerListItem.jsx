import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';

import NetworkCallConfig from '../../../config/network-call.config';

const TrackerListItem = ({ trackerCalls, trackerId }) => {
  const trackerData = NetworkCallConfig.trackerData[trackerId];

  if (trackerData) {
    return (
      <ListItem
        primaryText={(
          <div className="trackerTitle">
            {`${trackerData.displayName} (${trackerCalls.length})`}
          </div>
        )}
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
