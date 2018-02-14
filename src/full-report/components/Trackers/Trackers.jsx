import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import json2csv from 'json2csv';

import TrackerList from './TrackerList';
import * as chromeUtils from '../../../chrome.utils';
import * as downloadUtils from './downloadUtils';

export default class Trackers extends Component {
  static propTypes = {
    trackers: PropTypes.object.isRequired,
    trackerCount: PropTypes.number.isRequired,
    trackClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.downloadJson = this.downloadJson.bind(this);
    this.downloadCsv = this.downloadCsv.bind(this);
    this.trackers = this.props.trackers;
    this.trackClick = this.props.trackClick;
  }

  downloadJson() {
     _gaq.push(['_trackEvent', 'Full Report Download', 'JSON', 'Trackers']);
    const parsedTrackerData = downloadUtils.parseTrackers(this.trackers);
    const trackersString = JSON.stringify(parsedTrackerData, null, 2);
    const trackersB64 = new Buffer(trackersString).toString('base64');

    chromeUtils.downloadData(
      trackersB64,
      {
        mediatype: 'application/json',
        isBase64: true,
        saveAs: true,
      });
  }

  downloadCsv() {
    _gaq.push(['_trackEvent', 'Full Report Download', 'CSV', 'Trackers']);
    const fields = [
      {
        label: 'Tracker ID',
        value: 'trackerId',
      },
      {
        label: 'Tracker Name',
        value: 'displayName',
      },
      {
        label: 'URL',
        value: 'url',
      },
      {
        label: 'Method',
        value: 'method',
      },
      {
        label: 'Status',
        value: 'status',
      },
      {
        label: 'Type',
        value: 'type',
      },
      {
        label: 'Timestamp',
        value: 'timeStamp',
      },
    ];
    const parsedTrackerData = downloadUtils.parseTrackers(this.trackers);
    const flattenedTrackerData = downloadUtils.flattenForCSV(parsedTrackerData);
    const csv = json2csv({
      data: flattenedTrackerData,
      fields,
    });
    const trackerB64 = new Buffer(csv).toString('base64');

    chromeUtils.downloadData(
      trackerB64,
      {
        mediatype: 'text/csv',
        isBase64: true,
        saveAs: true,
      });
  }

  render() {
    const { trackers, trackerCount } = this.props;
    let downloadButton = '';

    if (trackerCount > 0) {
      downloadButton = (
        <IconMenu
          iconButtonElement={(
            <FlatButton
              backgroundColor="#ffc72c"
              hoverColor="#4b4f54"
              label={<span>Download as...</span>}
              className="yellowMhButton"
            />
          )}
        >
          <MenuItem onClick={this.downloadJson} primaryText="Download JSON" />
          <MenuItem onClick={this.downloadCsv} primaryText="Download CSV" />
        </IconMenu>
      );
    }

    return (
      <div>
        <div className="tabHeader">
          <div className="halfColumn" style={{ height: '75px', lineHeight: '75px' }}>
            <h3 className="no-margin tabTitle">Trackers</h3>
          </div>
          <div className="halfColumn" style={{ height: '75px', paddingTop: '19.5px', textAlign: 'right' }}>
            {downloadButton}
          </div>
        </div>
        <Paper zDepth={1}>
          <TrackerList
            trackers={trackers}
            trackerCount={trackerCount}
            trackClick={this.trackClick}
          />
        </Paper>
      </div>
    );
  }
}
