import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ tab }) => (
  <div className="custom-container">
    <div className="trackerCount">
      <div className="content">
        {tab.trackerCount || 0}
      </div>
      <div className="heading">
        <h4 className="thin">Trackers</h4>
      </div>
    </div>
    <div className="clearfix">
      <div className="halfColumn subData">
        <h5>Containers</h5>
        <span className="data">{Object.keys(tab.containers).length}</span>
      </div>
      <div className="halfColumn subData">
        <h5>Network Calls</h5>
        <span className="data">{tab.networkCalls.all.length}</span>
      </div>
    </div>
  </div>
);

Home.propTypes = {
  tab: PropTypes.object.isRequired,
};

export default Home;
