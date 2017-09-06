import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

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
  }
}
