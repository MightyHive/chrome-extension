import React from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import FlatButton from 'material-ui/FlatButton';

const CustomLayers = ({ layers, theme }) => {
  if (layers.length > 0) {
    return (
      <div>
        <div
          className="clearfix"
          style={{
            height: '40px',
            lineHeight: '40px',
          }}
        >
          <div className="halfColumn">
            <h4 className="no-margin">Custom data layers</h4>
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
          {layers.map(layer => (
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
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h4>Custom data layers</h4>
      No custom data layers found. Track custom data layers <a href="#" onClick={() => chrome.runtime.openOptionsPage()}>in the options.</a>
    </div>
  );
};

CustomLayers.propTypes = {
  layers: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
};

export default CustomLayers;
