import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const NetworkCalls = ({ network }) => {
  if (network.all.length > 0) {
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          selectable={false}
        >
          <TableRow>
            <TableHeaderColumn style={{ width: '450px' }}>Name</TableHeaderColumn>
            <TableHeaderColumn>Method</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn>Type</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {network.all.map(request => (
            <TableRow key={`${request.data.requestId}-${request.data.timeStamp}`}>
              <TableRowColumn style={{ width: '450px' }}>{request.data.url}</TableRowColumn>
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
};

NetworkCalls.propTypes = {
  network: PropTypes.object.isRequired,
};

export default NetworkCalls;
