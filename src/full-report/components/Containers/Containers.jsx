import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

const Containers = ({ containers }) => (
  <div className="containers">
    <div className="tabHeader">
      <div style={{ height: '75px', lineHeight: '75px' }}>
        <h3 className="no-margin tabTitle">Containers</h3>
      </div>
    </div>
    <Paper zDepth={1} style={{ padding: '20px' }}>
      <List className="containerList">
        {containers.map((container) => {
          let containerData;

          if (container.data) {
            containerData = (
            [<ul className="containerData">
              {Object.keys(container.data).map(key => (
                <li><span className="dataTitle">{key}</span>{`: ${container.data[key]}`}</li>
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

Containers.propTypes = {
  containers: PropTypes.array.isRequired,
};

export default Containers;
