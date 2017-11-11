import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';

import ContainerItem from './ContainerItem';

const Containers = ({ tab }) => {
  const { containers } = tab;

  if (Object.keys(containers).length > 0) {
    return (
      <div className="custom-container">
        <h4 className="no-margin">Containers</h4>
        <List>
          {Object.keys(containers).map((containerId) => {
            const containerItems = containers[containerId];
            return (
              <ContainerItem
                containerItems={containerItems}
                containerId={containerId}
                key={`container-${containerId}`}
              />
            );
          })}
        </List>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <h3 className="no-top-margin">No containers found.</h3>
    </div>
  );
};

Containers.propTypes = {
  tab: PropTypes.object.isRequired,
};

export default Containers;
