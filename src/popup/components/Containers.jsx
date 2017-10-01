import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

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
              let containerData;

              if (container.data) {
                containerData = (
                [<ul>
                  {Object.keys(container.data).map(key => (
                    <li>{`${key}: ${container.data[key]}`}</li>
                  ))}
                </ul>]
                );
              }

              return (
                <ListItem
                  primaryText={container.displayName}
                  primaryTogglesNestedList
                  nestedItems={containerData}
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
  }
}

export default Containers;
