import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

import TrackerListItem from './TrackerListItem';

const TrackerList = ({ trackers, trackerCount, trackerFire }) => {
  if (trackerCount > 0) {
    return (
      <div>
        <List>
          {Object.keys(trackers).map((trackerId) => {
            const trackerCalls = trackers[trackerId];
            return (
              <TrackerListItem
                trackerCalls={trackerCalls}
                trackerId={trackerId}
                key={trackerId}
                trackerFire={trackerFire}
              />
            );
          })}
        </List>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <h3 className="no-top-margin">No trackers found.</h3>
    </div>
  );
};

TrackerList.propTypes = {
  trackers: PropTypes.object.isRequired,
  trackerCount: PropTypes.number.isRequired,
  trackerFire: PropTypes.func.isRequired,
};

export default TrackerList;
