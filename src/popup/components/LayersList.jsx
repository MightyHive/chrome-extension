import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class LayersList extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
  }

  render() {
    const layers = this.props.layers;

    if (layers.length > 0) {
      return (
        <List
          style={{
            border: '1px solid rgb(217, 217, 217)',
          }}
        >
          <Subheader>Data Layers</Subheader>
          {layers.map(layer => (
            <ListItem>{layer.displayName}</ListItem>
          ))}
        </List>
      );
    }

    return (<span>No data layers found.</span>);
  }
}

export default LayersList;
