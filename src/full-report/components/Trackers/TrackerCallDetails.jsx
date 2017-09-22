import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as url from 'url';
import JSONTree from 'react-json-tree';
import { Grid, Row, Col } from 'react-flexbox-grid';

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
    const { trackerCall } = this.props;
    const tracker = trackerCall.data;
    const query = trackerCall.parsedUrl.query;
    let querySection = '';

    if (Object.keys(query).length !== 0 && query.constructor === Object) {
      querySection = (
        <div className="trackerQuery">
          <h4>Query Parameters</h4>
          <JSONTree
            data={query}
            theme={theme}
            shouldExpandNode={() => false}
            invertTheme
          />
        </div>
      );
    }

    if (tracker) {
      return (
        <Grid fluid className="trackerCallDetails">
          <Row className="trackerMeta">
            <Col xs className="trackerMetaItem">
              <h5 className="trackerMetaTitle">Method:</h5>
              <span>{tracker.method}</span>
            </Col>
            <Col xs className="trackerMetaItem">
              <h5 className="trackerMetaTitle">Status:</h5>
              <span>{tracker.statusCode}</span>
            </Col>
            <Col xs className="trackerMetaItem">
              <h5 className="trackerMetaTitle">Type:</h5>
              <span>{tracker.type}</span>
            </Col>
          </Row>
          <Row>
            <Col xs>
              {querySection}
            </Col>
          </Row>
        </Grid>
      );
    }
    return (<span>No tracker details found.</span>);
  }
}

