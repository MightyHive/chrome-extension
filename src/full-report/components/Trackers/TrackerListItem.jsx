import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';

import NetworkCallConfig from '../../../config/network-call.config';
import TrackerCallDetails from './TrackerCallDetails';

const TrackerListItem = ({ trackerId, trackerCalls }) => {
  const trackerData = NetworkCallConfig.trackerData[trackerId];

  if (trackerData) {
    return (
      <ListItem
        primaryText={(
          <div className="trackerTitle">
            {`${trackerData.displayName} (${trackerCalls.length})`}
          </div>
        )}
        primaryTogglesNestedList
        nestedItems={[
          (trackerCalls.map(tracker => (
            <ListItem
              primaryText={(
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tracker.data.url}
                </div>
              )}
              primaryTogglesNestedList
              nestedItems={[(
                <TrackerCallDetails
                  trackerCall={tracker}
                  key={`${tracker.data.requestId}-${tracker.data.timeStamp}-details`}
                />
              )]}
              key={`${tracker.data.requestId}-${tracker.data.timeStamp}`}
            />
            ))),
        ]}
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
