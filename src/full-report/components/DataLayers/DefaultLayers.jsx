import React from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';

const LayersList = ({ layers, theme }) => {
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

  return <span />;
};

LayersList.propTypes = {
  layers: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
};

export default LayersList;
