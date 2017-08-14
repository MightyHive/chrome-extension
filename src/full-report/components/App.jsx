import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

// Components
import LayersList from './LayersList';
import NetworkCalls from './NetworkCalls';

class App extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
    network: PropTypes.object.isRequired,
    successfulLoad: PropTypes.bool.isRequired,
  }

  render() {
    if (!this.props.successfulLoad) {
      return (
        <div className="center">
          <i className="icon icon-ic_play-circle_outline_black_24dp" /> Unable to load site data.
        </div>
      );
    }
    return (
      <div className="App">
        <Tabs>
          <Tab label="Data Layers">
            <h3>Data Layers</h3>
            <LayersList layers={this.props.layers} />
          </Tab>
          <Tab label="Network Activity">
            <h3>Total Network Requests:</h3>
            <div>{this.props.network.all.length}</div>
            <NetworkCalls network={this.props.network} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;
