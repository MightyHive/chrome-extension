import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import CustomDataLayers from './CustomDataLayers';

export default class App extends Component {
  static propTypes = {
    getFromStorage: PropTypes.func.isRequired,
    saveToStorage: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <h3 className="no-top-margin">Options</h3>
        <h5 className="no-bottom-margin">Custom Data Layers</h5>
        <CustomDataLayers
          getFromStorage={this.props.getFromStorage}
          saveToStorage={this.props.saveToStorage}
        />
      </div>
    );
  }
}
