import React, { Component } from 'react';

class LayersList extends Component {
  render() {
    console.log('LAYERS RECEIVED AT LAYERSLIST->', this.props.layers);
    return (
      <ul>
        {this.props.layers.map(layer => <li>{layer.name}</li>)}
      </ul>
    );
  }
}

export default LayersList;
