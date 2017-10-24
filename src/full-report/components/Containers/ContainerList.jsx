import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

import ContainerListItem from './ContainerListItem';

const ContainerList = ({ containers }) => {
  if (Object.keys(containers).length > 0) {
    return (
      <List>
        {Object.keys(containers).map((containerId) => {
          const containerItems = containers[containerId];
          return (
            <ContainerListItem
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
        padding: '20px',
      }}
    >
      <h3>No containers found.</h3>
    </div>
  );
};

ContainerList.propTypes = {
  containers: PropTypes.object.isRequired,
};

export default ContainerList;
