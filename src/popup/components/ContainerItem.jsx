import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';

import ContainerConfig from '../../config/container.config';

const ContainerItem = ({ containerItems, containerId }) => {
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
            let displayName;

            if (typeof container === 'string') {
              displayName = container;
            } else {
              displayName = container.displayName;
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
                    {displayName}
                  </div>
                )}
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

ContainerItem.propTypes = {
  containerItems: PropTypes.object.isRequired,
  containerId: PropTypes.string.isRequired,
};

export default ContainerItem;
