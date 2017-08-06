import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LayersList extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
  }

  render() {
    const layers = this.props.layers;

    if (layers.length > 0) {
      return (
        <ul className="layers-list">
          {layers.map(layer => <li>{layer.displayName}</li>)}
        </ul>
      );
    }

    return (<span>No data layers found.</span>);
  }
}

export default LayersList;
