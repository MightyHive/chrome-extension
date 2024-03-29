import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';

const NavigationPathTooltip = ({ networkEvent, parsedUrl }) => {
  let queryParams = '';

  // Only include query parameter section if present
  if (Object.keys(parsedUrl.query).length > 0) {
    queryParams = (
      <div>
        <h3 className="tooltipTitle" style={{ marginTop: 0 }}>Query Params</h3>
        <Grid fluid>
          {Object.keys(parsedUrl.query).map(queryKey => (
            <Row
              key={`tooltip-${networkEvent.data.timeStamp}-queryKey-${queryKey}`}
              className="queryRow"
            >
              <Col xs={4}>
                <h5 className="queryKey">{queryKey}</h5>
              </Col>
              <Col xs={8}>
                <h5 className="queryValue">{parsedUrl.query[queryKey]}</h5>
              </Col>
            </Row>
          ))}
        </Grid>
      </div>
    );
  }

  return (
    <div className="navigationPathTooltip">
      <h3 className="tooltipTitle">URL</h3>
      <div style={{ marginBottom: '20px' }}>{parsedUrl.host + parsedUrl.pathname}</div>
      {queryParams}
    </div>
  );
};

NavigationPathTooltip.propTypes = {
  networkEvent: PropTypes.object.isRequired,
  parsedUrl: PropTypes.object.isRequired,
};

export default NavigationPathTooltip;
