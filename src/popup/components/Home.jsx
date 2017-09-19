import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
  }

  render() {
    const { tab } = this.props;

    return (
      <div className="custom-container">
        <div className="trackerCount">
          <div className="content">
            {tab.trackerCount || 0}
          </div>
          <div className="heading">
            <h4 className="thin">Trackers</h4>
          </div>
        </div>
        <div className="halfColumn subData">
          <h5>Data Layers</h5>
          <span className="data">{tab.dataLayers.length}</span>
        </div>
        <div className="halfColumn subData">
          <h5>Network Calls</h5>
          <span className="data">{tab.networkCalls.all.length}</span>
        </div>

        <RaisedButton
          label="View Full Report"
          backgroundColor="#183063"
          labelColor="#ffb50b"
          fullWidth
          onClick={this.openReport}
          labelStyle={{ fontFamily: 'Roboto Bold' }}
          style={{ marginTop: '20px' }}
        />
      </div>
    );
  }
}

export default Home;
