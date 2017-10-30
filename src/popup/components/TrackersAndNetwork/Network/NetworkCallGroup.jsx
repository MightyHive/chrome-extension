import React from 'react';
import PropTypes from 'prop-types';

const NetworkCallGroup = ({ calls }) => (
  <ul className="networkCallGroup">
    {calls.map(call => (
      <li>{call.parsedUrl.hostname + call.parsedUrl.pathname}</li>
    ))}
  </ul>
);

NetworkCallGroup.propTypes = {
  calls: PropTypes.array.isRequired,
};

export default NetworkCallGroup;
