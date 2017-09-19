import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import LayersList from './LayersList';

class DataLayers extends Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
  }

  render() {
    const { tab } = this.props;

    return (
      <div className="custom-container">
        <LayersList layers={tab.dataLayers} />
      </div>
    );
  }
}

export default DataLayers;
