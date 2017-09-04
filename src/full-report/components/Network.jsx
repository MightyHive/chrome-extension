import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import json2csv from 'json2csv';

import NetworkCalls from './NetworkCalls';
import * as chromeUtils from '../../chrome.utils';

class DataLayers extends Component {
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
    return (
      <div className="container">
        <h3 className="no-top-margin">Total Network Requests: {this.props.network.all.length}</h3>
        <RaisedButton
          onClick={this.downloadCsv}
          label="Download CSV"
          secondary
        />
        <NetworkCalls
          network={this.props.network}
          currentURL={this.props.currentURL}
        />
      </div>
    );
  }
}

export default DataLayers;
