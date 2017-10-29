import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';

import ContainerItem from './ContainerItem';

const Containers = ({ tab }) => {
  const { containers } = tab;

  if (Object.keys(containers).length > 0) {
    return (
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
