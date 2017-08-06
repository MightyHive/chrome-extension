import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import LayersList from './LayersList';

class App extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Data Layers</h2>
        </div>
        <LayersList layers={this.props.layers} />
      </div>
    );
  }
}

export default App;
