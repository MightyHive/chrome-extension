import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import TrackerList from './TrackerList';
import NetworkCallConfig from '../../config/network-call.config';
import * as chromeUtils from '../../chrome.utils';

class Datatrackers extends Component {
  static propTypes = {
    trackers: PropTypes.array.isRequired,
    trackerCount: PropTypes.number.isRequired,
    network: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.downloadJson = this.downloadJson.bind(this);
    this.trackers = this.props.trackers;
  }

  // Tracker data needs to be parsed prior to download, to include the tracker
  // metadata as well as clean out internal Chrome properties from the tracker network
  // calls.
  downloadJson() {
    const parsedTrackerData = Object.keys(this.trackers).map((trackerId) => {
      const trackerCalls = this.trackers[trackerId];
      const trackerData = NetworkCallConfig.trackerData[trackerId];
      return {
        id: trackerId,
        displayName: trackerData.displayName,
        trackerCalls: trackerCalls.map(tracker =>
          ({
            url: tracker.url,
            method: tracker.data.method,
            status: tracker.data.statusCode,
            type: tracker.data.type,
            timeStamp: tracker.data.timeStamp,
          }),
        ),
      };
    });
    const trackersString = JSON.stringify(parsedTrackerData);
    const trackersB64 = new Buffer(trackersString).toString('base64');

    chromeUtils.downloadData(
      trackersB64,
      {
        mediatype: 'application/json',
        isBase64: true,
        saveAs: true,
      });
  }

  render() {
    const { trackers, trackerCount, network } = this.props;

    return (
      <div className="container">
        <h3 className="no-top-margin">Trackers</h3>
        <RaisedButton
          onClick={this.downloadJson}
          label="Download JSON"
          secondary
        />
        <h6>Total Network Requests: {network.all.length}</h6>
        <TrackerList
          trackers={trackers}
          trackerCount={trackerCount}
        />
      </div>
    );
  }
}

export default Datatrackers;
