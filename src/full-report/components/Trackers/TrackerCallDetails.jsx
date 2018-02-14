import React from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { monokaiTheme } from '../../../config/theme.config';

const TrackerCallDetails = ({ trackerCall, trackClick }) => {
  const tracker = trackerCall.data;
  const query = trackerCall.parsedUrl.query;
  let querySection = '';

  if (Object.keys(query).length > 0) {
    querySection = (
      <div className="trackerQuery">
        <h4>Query Parameters</h4>
        <JSONTree
          data={query}
          theme={monokaiTheme}
          shouldExpandNode={() => false}
          invertTheme
        />
      </div>
    );
  }

  if (tracker) {
    return (
      <Grid
        fluid
        className="trackerCallDetails"
        onClick={
          () => trackClick('Tracker Detail Item', null)
        }
      >
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
};

TrackerCallDetails.propTypes = {
  trackerCall: PropTypes.object.isRequired,
  trackClick: PropTypes.func.isRequired,
};

export default TrackerCallDetails;
