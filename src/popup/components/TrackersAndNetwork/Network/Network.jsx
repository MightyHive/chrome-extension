import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

import NetworkCallGroup from './NetworkCallGroup';

const Network = ({ network }) => {
  const callsByHost = {};

  network.all.forEach((call) => {
    const { hostname } = call.parsedUrl;

    if (!callsByHost[hostname]) {
      callsByHost[hostname] = [call];
    } else {
      callsByHost[hostname].push(call);
    }
  });

  if (network.all.length > 0) {
    return (
      <div>
        <List>
          {Object.keys(callsByHost).sort().map((hostname) => {
            const calls = callsByHost[hostname];
            return (
              <ListItem
                primaryText={`${hostname} (${calls.length})`}
                primaryTogglesNestedList
                nestedItems={[(
                  <NetworkCallGroup
                    calls={calls}
                  />
                )]}
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
      <h3 className="no-top-margin">No network activity found.</h3>
    </div>
  );
};

Network.propTypes = {
  network: PropTypes.object.isRequired,
};

export default Network;
