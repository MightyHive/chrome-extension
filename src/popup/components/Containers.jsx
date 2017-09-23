import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

import ContainerConfig from '../../config/container.config';

class Containers extends Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
  }

  render() {
    const { containers } = this.props.tab;

    if (containers.length > 0) {
      return (
        <div className="custom-container">
          <h4 className="no-margin">Containers</h4>
          <List>
            {containers.map((container) => {
              // The is the internal ID for finding metadata, not the actual container ID
              const containerId = container.containerId;
              const displayName = ContainerConfig.containerData[containerId].displayName;
              return (<ListItem>{`${displayName}: ${container.id}`}</ListItem>);
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
        <h3 className="no-top-margin">No trackers found.</h3>
      </div>
    );
  }
}

export default Containers;
