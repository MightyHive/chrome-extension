import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import TrackerListItem from './TrackerListItem';

export default class NetworkCalls extends Component {
  static propTypes = {
    trackers: PropTypes.object.isRequired,
    trackerCount: PropTypes.number.isRequired,
  }

  render() {
    const { trackers, trackerCount } = this.props;

    if (trackerCount > 0) {
      return (
        <List>
          <Subheader>Trackers</Subheader>
          {Object.keys(trackers).map((trackerId) => {
            const trackerCalls = trackers[trackerId];
            return (
              <TrackerListItem
                trackerCalls={trackerCalls}
                trackerId={trackerId}
              />
            );
          })}
        </List>
      );
    }

    return (<span>No trackers found.</span>);
  }
}
