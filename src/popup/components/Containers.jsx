import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import ReactGA from 'react-ga';

import ContainerItem from './ContainerItem';

const Containers = ({ tab }) => {
  const { containers } = tab;
  ReactGA.initialize('UA-37980828-6');

  if (Object.keys(containers).length > 0) {
    return (
      <div className="custom-container">
        <h4 className="no-margin">Containers</h4>
        <List>
          {Object.keys(containers).map((containerId) => {
            const containerItems = containers[containerId];
            ReactGA.event({
              category: 'Pop Up',
              action: 'View Containers Tab',
              nonInteraction: true,
            });
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
