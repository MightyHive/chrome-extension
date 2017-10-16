import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import DefaultLayers from './DefaultLayers';
import CustomLayers from './CustomLayers';
import * as chromeUtils from '../../../chrome.utils';
import { monokaiTheme } from '../../../config/theme.config';

export default class DataLayers extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.downloadJson = this.downloadJson.bind(this);
    this.layers = this.props.layers;
  }

  downloadJson() {
    const layersString = JSON.stringify(this.layers);
    const layersB64 = new Buffer(layersString).toString('base64');

    chromeUtils.downloadData(
      layersB64,
      {
        mediatype: 'application/json',
        isBase64: true,
        saveAs: true,
      });
  }

  render() {
    const defaultLayers = this.layers.filter(layer => layer.type !== 'userDefined');
    const userLayers = this.layers.filter(layer => layer.type === 'userDefined');
    let downloadButton = '';

    if (this.layers.length > 0) {
      downloadButton = (
        <FlatButton
          onClick={this.downloadJson}
          label="Download JSON"
          backgroundColor="#ffc72a"
          hoverColor="#183063"
          className="yellowMhButton"
        />
      );
    }

    return (
      <div>
        <div className="tabHeader">
          <div className="halfColumn" style={{ height: '75px', lineHeight: '75px' }}>
            <h3 className="no-margin tabTitle">Data Layers</h3>
          </div>
          <div className="halfColumn" style={{ height: '75px', paddingTop: '19.5px', textAlign: 'right' }}>
            {downloadButton}
          </div>
        </div>
        <Paper zDepth={1} style={{ padding: '20px' }}>
          <DefaultLayers layers={defaultLayers} theme={monokaiTheme} />
          <CustomLayers layers={userLayers} theme={monokaiTheme} />
        </Paper>
      </div>
    );
  }
}
