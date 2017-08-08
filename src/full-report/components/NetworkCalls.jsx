import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NetworkCalls extends Component {
  static propTypes = {
    network: PropTypes.object.isRequired,
  }

  render() {
    const network = this.props.network;

    if (network.all.length > 0) {
      return (
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
          <thead>
            <tr>
              <th className="mdl-data-table__cell--non-numeric">Name</th>
              <th className="mdl-data-table__cell--non-numeric">Method</th>
              <th>Status</th>
              <th className="mdl-data-table__cell--non-numeric">Type</th>
            </tr>
          </thead>
          <tbody>
            {network.all.map(request => (
              <tr>
                <td className="mdl-data-table__cell--non-numeric">{request.url}</td>
                <td className="mdl-data-table__cell--non-numeric">{request.method}</td>
                <td>{request.statusCode}</td>
                <td className="mdl-data-table__cell--non-numeric">{request.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (<span>No network data found.</span>);
  }
}

export default NetworkCalls;
