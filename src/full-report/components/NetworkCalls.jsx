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

const parse = require('url-parse');

class NetworkCalls extends Component {
  static propTypes = {
    network: PropTypes.object.isRequired,
    currentURL: PropTypes.string.isRequired,
  }

  render() {
    console.log(parse(this.props.currentURL));
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
                <TableRowColumn>{request.url}</TableRowColumn>
                <TableRowColumn>{request.method}</TableRowColumn>
                <TableRowColumn>{request.statusCode}</TableRowColumn>
                <TableRowColumn>{request.type}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    //TODO: strip to just hostnames
    // Object.keys(a).map(function(keyName, keyIndex) {

    // })

    return (<span>No network data found.</span>);
  }
}

export default NetworkCalls;
