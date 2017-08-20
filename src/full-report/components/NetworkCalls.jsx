import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class NetworkCalls extends Component {
  static propTypes = {
    network: PropTypes.object.isRequired,
    currentURL: PropTypes.string.isRequired,
  }

  render() {
    const network = this.props.network;

    if (network.all.length > 0) {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Method</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Type</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {network.all.map(request => (
              <TableRow>
                <TableRowColumn>{request.data.url}</TableRowColumn>
                <TableRowColumn>{request.data.method}</TableRowColumn>
                <TableRowColumn>{request.data.statusCode}</TableRowColumn>
                <TableRowColumn>{request.data.type}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    return (<span>No network data found.</span>);
  }
}

export default NetworkCalls;
