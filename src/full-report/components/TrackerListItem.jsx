import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

import NetworkCallConfig from '../../config/network-call.config';
import TrackerCallDetails from './TrackerCallDetails';

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
          primaryText={`${trackerData.displayName} (${trackerCalls.length})`}
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
                    key={`${tracker.data.requestId}-details`}
                  />
                )]}
                key={tracker.data.requestId}
              />
              ))),
          ]}
        />
      );
    }
    return (<span style={{ display: 'none' }}>Tracker data not found for ID {trackerId}</span>);
  }
}
