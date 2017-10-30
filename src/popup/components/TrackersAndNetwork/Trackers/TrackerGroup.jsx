import React from 'react';
import PropTypes from 'prop-types';

const TrackerGroup = ({ trackers }) => (
  <ul className="trackerGroup">
    {trackers.map(tracker => (
      <li>{tracker.parsedUrl.hostname + tracker.parsedUrl.path}</li>
    ))}
  </ul>
);

TrackerGroup.propTypes = {
  trackers: PropTypes.array.isRequired,
};

export default TrackerGroup;
