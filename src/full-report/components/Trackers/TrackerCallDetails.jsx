import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import * as url from 'url';
import JSONTree from 'react-json-tree';

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

export default class TrackerCallDetails extends Component {
  static propTypes = {
    trackerCall: PropTypes.object.isRequired,
  }

  render() {
    const tracker = this.props.trackerCall.data;
    const query = url.parse(tracker.url, true).query;
    let querySection = '';

    if (Object.keys(query).length !== 0 && query.constructor === Object) {
      querySection = (
        <span>
          <h3>Query Parameters</h3>
          <JSONTree
            data={query}
            theme={theme}
            shouldExpandNode={() => false}
            invertTheme
          />
        </span>
      );
    }

    if (tracker) {
      return (
        <div style={{ paddingLeft: '40px' }}>
          <h5 className="no-margin">Method: {tracker.method}</h5>
          <h5 className="no-margin">Status: {tracker.statusCode}</h5>
          <h5 className="no-margin">Type: {tracker.type}</h5>
          {querySection}
        </div>
      );
    }
    return (<span>No tracker details found.</span>);
  }
}

