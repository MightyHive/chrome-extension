import React, { Component } from 'react';

class LayersList extends Component {
  render() {
    return (
      <ul>
        {this.props.layers.map(layer => <li>{layer.name}</li>)}
      </ul>
    );
  }
}

export default LayersList;
