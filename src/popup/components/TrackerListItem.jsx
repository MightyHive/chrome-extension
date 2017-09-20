import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';

import NetworkCallConfig from '../../config/network-call.config';

export default class TrackerListItem extends Component {
  static propTypes = {
    trackerCalls: PropTypes.array.isRequired,
    trackerId: PropTypes.string.isRequired,
  }

  render() {
    const { trackerId, trackerCalls } = this.props;
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
  }
}
