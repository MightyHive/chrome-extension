import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import FlatButton from 'material-ui/FlatButton';

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

export default class LayersList extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
  }

  render() {
    const layers = this.props.layers;

    if (layers.length > 0) {
      const defaultLayers = layers.filter(layer => layer.type !== 'userDefined');
      const userLayers = layers.filter(layer => layer.type === 'userDefined');
      let defaultLayersElement = (<div>No layers found.</div>);
      let userLayersElement = (
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <h4>Custom data layers</h4>
          No custom data layers found. Add custom data layers <a href="#" onClick={() => chrome.runtime.openOptionsPage()}>in the options.</a>
        </div>
        );

      if (defaultLayers.length > 0) {
        defaultLayersElement = (
          <ul className="layers-list">
            {defaultLayers.map(layer => (
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
        );
      }

      if (userLayers.length > 0) {
        userLayersElement = (
          <div>
            <div
              className="clearfix"
              style={{
                height: '40px',
                lineHeight: '40px',
              }}
            >
              <div className="halfColumn">
                <h4>Custom data layers</h4>
              </div>
              <div
                className="halfColumn"
                style={{
                  textAlign: 'right',
                }}
              >
                <FlatButton
                  label="Options"
                  onClick={() => chrome.runtime.openOptionsPage()}
                />
              </div>
            </div>
            <ul className="layers-list">
              {userLayers.map(layer => (
                <li key={layer.key}>
                  <span className="layer-label">{layer.key}</span>
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
        <div className="container">
          {defaultLayersElement}
          {userLayersElement}
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
