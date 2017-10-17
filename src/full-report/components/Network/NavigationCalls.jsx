import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

import TrackerCallDetails from '../Trackers/TrackerCallDetails';

const NavigationCalls = ({ requests }) => {
  if (requests.length > 0) {
    return (
      <List>
        {requests.map(call => (
          <ListItem
            primaryText={(
              <div
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {call.data.url}
              </div>
            )}
            primaryTogglesNestedList
            nestedItems={[(
              <TrackerCallDetails
                trackerCall={call}
                key={`${call.data.requestId}-${call.data.timeStamp}-navCalldetails`}
              />
            )]}
            key={`${call.data.requestId}-${call.data.timeStamp}-navCall`}
          />
          ))}
      </List>
    );
  }

  return (<span>No network data found.</span>);
};

NavigationCalls.propTypes = {
  requests: PropTypes.array.isRequired,
};

export default NavigationCalls;
