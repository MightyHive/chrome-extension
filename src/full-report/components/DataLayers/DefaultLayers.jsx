import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';

export default class LayersList extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
  }

  render() {
    const { layers, theme } = this.props;

    if (layers.length > 0) {
      return (
        <div>
          <h4 className="no-margin">Standard data layers</h4>
          <ul className="layers-list">
            {layers.map(layer => (
              <li key={layer.id}>
                <span className="layer-label">{layer.displayName}</span>
                <JSONTree
                  data={layer.data}
                  theme={theme}
                  shouldExpandNode={() => false}
                  invertTheme
                />
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <h3>No data layers found.</h3>
      </div>
    );
  }
}
