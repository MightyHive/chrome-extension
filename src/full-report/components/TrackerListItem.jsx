import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import NetworkCallConfig from '../../config/network-call.config';

export default class NetworkCalls extends Component {
  static propTypes = {
    trackerCalls: PropTypes.array.isRequired,
    trackerId: PropTypes.string.isRequired,
  }

  render() {
    const { trackerId, trackerCalls } = this.props;
    const trackerData = NetworkCallConfig.trackerData[trackerId];

    if (trackerData) {
      return (
        <ListItem
          primaryText={`${trackerData.displayName} (${trackerCalls.length})`}
          primaryTogglesNestedList
          nestedItems={[
            (<div style={{ marginLeft: '10px' }}>
              <Table>
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  selectable={false}
                >
                  <TableRow>
                    <TableHeaderColumn style={{ width: '450px' }}>URL</TableHeaderColumn>
                    <TableHeaderColumn>Method</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                    <TableHeaderColumn>Type</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {trackerCalls.map(tracker => (
                    <TableRow>
                      <TableRowColumn style={{ width: '450px' }}>{tracker.data.url}</TableRowColumn>
                      <TableRowColumn>{tracker.data.method}</TableRowColumn>
                      <TableRowColumn>{tracker.data.statusCode}</TableRowColumn>
                      <TableRowColumn>{tracker.data.type}</TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>),
          ]}
        />
      );
    }
    return (<span style={{ display: 'none' }}>Tracker data not found for ID {trackerId}</span>);
  }
}
