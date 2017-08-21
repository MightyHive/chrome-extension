import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';

import NetworkCallConfig from '../../config/network-call.config';

export default class NetworkCalls extends Component {
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
          primaryText={`${trackerData.displayName} (${trackerCalls.length})`}
        />
      );
    }
    return (<span style={{ display: 'none' }}>Tracker data not found for ID {trackerId}</span>);
  }
}
