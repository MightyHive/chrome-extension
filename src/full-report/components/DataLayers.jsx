import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import LayersList from './LayersList';
import * as chromeUtils from '../../chrome.utils';

class DataLayers extends Component {
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
    return (
      <div>
        <div className="container">
          <div className="halfColumn" style={{ height: '75px', lineHeight: '75px' }}>
            <h3 className="no-margin tabTitle">Data Layers</h3>
          </div>
          <div className="halfColumn" style={{ height: '75px', paddingTop: '19.5px', textAlign: 'right' }}>
            <RaisedButton
              onClick={this.downloadJson}
              label="Download JSON"
              secondary
            />
          </div>
        </div>
        <div className="container">
          <Paper zDepth={1}>
            <LayersList layers={this.layers} />
          </Paper>
        </div>
      </div>
    );
  }
}

export default DataLayers;
