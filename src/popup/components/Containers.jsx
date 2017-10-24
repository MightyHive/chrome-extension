import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';

import ContainerItem from './ContainerItem';

class Containers extends Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
  }

  render() {
    const { containers } = this.props.tab;

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
  }
}

export default Containers;
