import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

import TrackerListItem from './TrackerListItem';

export default class TrackerList extends Component {
  static propTypes = {
    trackers: PropTypes.object.isRequired,
    trackerCount: PropTypes.number.isRequired,
  }

  render() {
    const { trackers, trackerCount } = this.props;

    if (trackerCount > 0) {
      return (
        <div>
          <h4 className="no-margin">Trackers</h4>
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
        </div>
      );
    }

    return (
      <div
        style={{
          textAlign: 'center',
          // padding: '20px',
        }}
      >
        <h3 className="no-top-margin">No trackers found.</h3>
      </div>
    );
  }
}
