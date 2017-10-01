import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

export default class Network extends Component {
  static propTypes = {
    network: PropTypes.object.isRequired,
  }

  render() {
    const { network } = this.props;
    const callsByHost = {};

    network.all.forEach((call) => {
      const { hostname } = call.parsedUrl;

      if (!callsByHost[hostname]) {
        callsByHost[hostname] = 1;
      } else {
        callsByHost[hostname] += 1;
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
                  primaryText={`${hostname} (${calls})`}
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
  }
}
