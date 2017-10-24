import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';

import ContainerConfig from '../../../config/container.config';
import ContainerListItemDetails from './ContainerListItemDetails';

const ContainerListItem = ({ containerItems, containerId }) => {
  const containerMeta = ContainerConfig.containerMeta[containerId];

  if (containerMeta) {
    return (
      <ListItem
        primaryText={(
          <div className="trackerTitle">
            {`${containerMeta.displayName}`}
          </div>
        )}
        primaryTogglesNestedList
        nestedItems={[
          (containerItems.map((container, i) => {
            if (typeof container === 'string') {
              return (
                <ListItem
                  primaryText={(
                    <div
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {container}
                    </div>
                  )}
                  key={`container-${container}-${i}`}
                />
              );
            }

            return (
              <ListItem
                primaryText={(
                  <div
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {container.displayName}
                  </div>
                )}
                primaryTogglesNestedList
                nestedItems={[(
                  <ContainerListItemDetails
                    container={container}
                    key={`container-${container}-${i}-details`}
                  />
                )]}
                key={`container-${container}-${i}`}
              />
            );
          })),
        ]}
      />
    );
  }
  return (<span style={{ display: 'none' }}>Container data not found.</span>);
};

ContainerListItem.propTypes = {
  containerItems: PropTypes.object.isRequired,
  containerId: PropTypes.string.isRequired,
};

export default ContainerListItem;
