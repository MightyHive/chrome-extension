import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ tab, select }) => (
  <div className="custom-container">
    <div className="trackerCount">
      <button onClick={() => select(2)} className="internal-button">
        <div className="content">
          {tab.trackerCount || 0}
        </div>
        <div className="heading">
          <h4 className="thin">Trackers</h4>
        </div>
      </button>
    </div>
    <div className="clearfix">
      <div className="halfColumn subData">
        <button onClick={() => select(1)} className="internal-button">
          <h5>Containers</h5>
          <span className="data">{Object.keys(tab.containers).length}</span>
        </button>
      </div>
      <div className="halfColumn subData">
        <button onClick={() => select(2)} className="internal-button">
          <h5>Network Calls</h5>
          <span className="data">{tab.networkCalls.all.length}</span>
        </button>
      </div>
    </div>
  </div>
);

Home.propTypes = {
  tab: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
};

export default Home;
