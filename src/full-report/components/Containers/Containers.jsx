import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

export default class Containers extends Component {
  static propTypes = {
    containers: PropTypes.array.isRequired,
  }

  render() {
    const { containers } = this.props;

    return (
      <div>
        <div className="tabHeader">
          <div style={{ height: '75px', lineHeight: '75px' }}>
            <h3 className="no-margin tabTitle">Containers</h3>
          </div>
        </div>
        <Paper zDepth={1} style={{ padding: '20px' }}>
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
        </Paper>
      </div>
    );
  }
}
