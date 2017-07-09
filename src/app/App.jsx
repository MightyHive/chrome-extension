import React, { Component } from 'react';

// Components
import LayersList from './LayersList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Testing</h2>
        </div>
        <LayersList layers={this.props.layers} />
      </div>
    );
  }
}

export default App;
