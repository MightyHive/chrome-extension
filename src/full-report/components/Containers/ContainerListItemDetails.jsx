import React from 'react';
import PropTypes from 'prop-types';

const ContainerListItemDetails = ({ container }) => {
  if (container.data) {
    return (
      <ul className="containerData">
        {Object.keys(container.data).map(key => (
          <li><span className="dataTitle">{key}</span>{`: ${container.data[key]}`}</li>
        ))}
      </ul>
    );
  }

  return (<span style={{ display: 'none' }}>Container data not found.</span>);
};

ContainerListItemDetails.propTypes = {
  container: PropTypes.object.isRequired,
};

export default ContainerListItemDetails;
