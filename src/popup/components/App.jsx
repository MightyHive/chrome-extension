import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

// Components
import LayersList from './LayersList';

class App extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
    network: PropTypes.object.isRequired,
    tabId: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.openReport = this.openReport.bind(this);
  }

  openReport() {
    chrome.tabs.create({ url: `/full-report.html?id=${this.props.tabId}` });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h3 className="no-top-margin">Page Summary</h3>
          <LayersList layers={this.props.layers} />

          <Card
            style={{
              marginTop: '20px',
            }}
          >
            <CardHeader title="Total Network Requests" />
            <CardText>{this.props.network.all.length}</CardText>
          </Card>

          <RaisedButton
            label="View Full Report"
            fullWidth
            primary
            onClick={this.openReport}
            style={{ marginTop: '20px' }}
          />
        </div>
      </div>
    );
  }
}

export default App;
