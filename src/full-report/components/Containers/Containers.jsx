import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import ContainerList from './ContainerList';

const Containers = ({ containers }) => (
  <div className="containers">
    <div className="tabHeader">
      <div style={{ height: '75px', lineHeight: '75px' }}>
        <h3 className="no-margin tabTitle">Containers</h3>
      </div>
    </div>
    <Paper zDepth={1} style={{ padding: '20px' }}>
      <ContainerList
        containers={containers}
      />
    </Paper>
  </div>
);

Containers.propTypes = {
  containers: PropTypes.array.isRequired,
};

export default Containers;
