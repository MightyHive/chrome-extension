import React, { Component } from 'react';

class LayersList extends Component {
  componentWillReceiveProps() {
    console.log('LayerList received new props', this.props.layers);
  }
  render() {
    console.log('LAYERS RECEIVED AT LAYERSLIST->', this.props.layers);
    return (
      <ul>
        {this.props.layers.map(layer => <li>{layer.displayName}</li>)}
      </ul>
    );
  }
}

export default LayersList;
