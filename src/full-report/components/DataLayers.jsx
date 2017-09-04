import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import LayersList from './LayersList';
import { downloadData } from '../../chrome.utils';

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

    downloadData(
      layersB64,
      {
        mediatype: 'application/json',
        isBase64: true,
        saveAs: true,
      });
  }

  render() {
    return (
      <div className="container">
        <h3 className="no-margin">Data Layers</h3>
        <RaisedButton
          onClick={this.downloadJson}
          label="Download JSON"
          secondary
        />
        <Paper zDepth={1}>
          <LayersList layers={this.layers} />
        </Paper>
      </div>
    );
  }
}

export default DataLayers;
