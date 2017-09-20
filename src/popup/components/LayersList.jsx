import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class LayersList extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
  }

  render() {
    const { layers } = this.props;

    if (layers.length > 0) {
      return (
        <List
          style={{
            border: '1px solid rgb(217, 217, 217)',
          }}
        >
          <Subheader>Standard data layers</Subheader>
          {layers.map(layer => (
            <ListItem>{layer.displayName}</ListItem>
          ))}
        </List>
      );
    }

    return (
      <div
        style={{
          textAlign: 'center',
          // padding: '20px',
        }}
      >
        <h3 className="no-top-margin">No data layers found.</h3>
      </div>
    );
  }
}

export default LayersList;
