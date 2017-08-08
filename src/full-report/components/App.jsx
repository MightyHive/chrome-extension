import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import LayersList from './LayersList';
import NetworkCalls from './NetworkCalls';

class App extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
    network: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="App">
        <h3>Data Layers</h3>
        <LayersList layers={this.props.layers} />

        <h3>Total Network Requests:</h3>
        <div>{this.props.network.all.length}</div>
        <NetworkCalls network={this.props.network} />
      </div>
    );
  }
}

export default App;
