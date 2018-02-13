import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import json2csv from 'json2csv';
import Paper from 'material-ui/Paper';

import NetworkCalls from './NetworkCalls';
import NavigationCalls from './NavigationCalls';
import * as chromeUtils from '../../../chrome.utils';

export default class Network extends Component {
  static propTypes = {
    currentURL: PropTypes.string.isRequired,
    network: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.downloadCsv = this.downloadCsv.bind(this);
    this.network = this.props.network;
  }

  downloadCsv() {
    _gaq.push(['_trackEvent', 'Full Report Download', 'CSV', 'Network Activity']);
    const fields = [
      {
        label: 'URL',
        value: 'data.url',
      },
      {
        label: 'Method',
        value: 'data.method',
      },
      {
        label: 'Status',
        value: 'data.statusCode',
      },
      {
        label: 'Type',
        value: 'data.type',
      },
    ];
    const csv = json2csv({ data: this.network.all, fields });
    const networkB64 = new Buffer(csv).toString('base64');

    chromeUtils.downloadData(
      networkB64,
      {
        mediatype: 'text/csv',
        isBase64: true,
        saveAs: true,
      });
  }

  render() {
    let downloadButton = '';

    if (this.props.network.all.length > 0) {
      downloadButton = (
        <FlatButton
          onClick={this.downloadCsv}
          label="Download CSV"
          backgroundColor="#ffc72c"
          hoverColor="#4b4f54"
          className="yellowMhButton"
        />
      );
    }

    return (
      <div>
        <div className="tabHeader">
          <div className="halfColumn" style={{ height: '75px', lineHeight: '75px' }}>
            <h3 className="no-margin tabTitle">Network Activity</h3>
          </div>
          <div className="halfColumn" style={{ height: '75px', paddingTop: '19.5px', textAlign: 'right' }}>
            {downloadButton}
          </div>
        </div>
        <h5 className="no-top-margin">Navigation requests:</h5>
        <Paper zDepth={1}>
          <NavigationCalls
            requests={this.network.tabContent.filter(call => call.data.type === 'main_frame')}
          />
        </Paper>
        <h5>Total Network Requests: {this.network.all.length}</h5>
        <NetworkCalls
          network={this.network}
          currentURL={this.props.currentURL}
        />
      </div>
    );
  }
}
