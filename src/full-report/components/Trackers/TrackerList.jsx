import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

import TrackerListItem from './TrackerListItem';

const TrackerList = ({ trackers, trackerCount }) => {
  if (trackerCount > 0) {
    return (
      <List>
        {Object.keys(trackers).map((trackerId) => {
          const trackerCalls = trackers[trackerId];
          return (
            <TrackerListItem
              trackerCalls={trackerCalls}
              trackerId={trackerId}
              key={trackerId}
            />
          );
        })}
      </List>
    );
  }

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h3>No trackers found.</h3>
    </div>
  );
};

TrackerList.propTypes = {
  trackers: PropTypes.object.isRequired,
  trackerCount: PropTypes.number.isRequired,
};

export default TrackerList;
