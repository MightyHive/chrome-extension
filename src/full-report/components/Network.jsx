import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import json2csv from 'json2csv';

import NetworkCalls from './NetworkCalls';
import * as chromeUtils from '../../chrome.utils';

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
          backgroundColor="#ffc72a"
          hoverColor="#183063"
          className="yellowMhButton"
        />
      );
    }

    return (
      <div>
        <div className="custom-container">
          <div className="halfColumn" style={{ height: '75px', lineHeight: '75px' }}>
            <h3 className="no-margin tabTitle">Network Activity</h3>
          </div>
          <div className="halfColumn" style={{ height: '75px', paddingTop: '19.5px', textAlign: 'right' }}>
            {downloadButton}
          </div>
        </div>
        <div className="custom-container">
          <h5 className="no-top-margin">Total Network Requests: {this.network.all.length}</h5>
          <NetworkCalls
            network={this.network}
            currentURL={this.props.currentURL}
          />
        </div>
      </div>
    );
  }
}
