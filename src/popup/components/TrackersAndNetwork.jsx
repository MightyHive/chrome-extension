import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import TrackerList from './TrackerList';

class TrackersAndNetwork extends Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
  }

  render() {
    const { trackers, trackerCount } = this.props.tab;

    return (
      <div className="custom-container">
        <TrackerList
          trackers={trackers}
          trackerCount={trackerCount}
        />
      </div>
    );
  }
}

export default TrackersAndNetwork;
