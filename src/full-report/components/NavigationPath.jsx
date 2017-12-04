import React from 'react';
import PropTypes from 'prop-types';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ReactTooltip from 'react-tooltip';

// Components
import NavigationPathTooltip from './NavigationPathTooltip';

const NavigationPath = ({ navigationPath }) => (
  <div className="navigationPathContainer">
    <ul className="navigationPath">
      {navigationPath.redirects.map((redirect) => {
        const requestKey = `navPath-${redirect.data.requestId}-${redirect.data.timeStamp}`;
        const tooltipId = `${requestKey}-tooltip`;
        const { protocol, host, pathname } = redirect.parsedUrl;
        const url = `${protocol}//${host + pathname}`;
        return (
          <li className="redirect clearfix" key={requestKey}>
            <div
              style={{
                float: 'left',
                paddingRight: '44px',
              }}
            >
              <div
                className="statusCode"
                data-tip="Loading..."
                data-for={tooltipId}
              >
                {redirect.data.statusCode}
              </div>
              <ReactTooltip
                place="bottom"
                type="dark"
                effect="solid"
                id={tooltipId}
              >
                <NavigationPathTooltip
                  networkEvent={redirect}
                  parsedUrl={redirect.parsedUrl}
                />
              </ReactTooltip>
              <div className="url">{url}</div>
            </div>
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: 0,
              }}
            >
              <ArrowForward />
            </div>
          </li>
        );
      })}
      <li className="final">
        <div
          className="statusCode"
          data-tip="Loading..."
          data-for="finalTooltip"
        >
          {navigationPath.final.data.statusCode}
        </div>
        <ReactTooltip
          place="bottom"
          type="dark"
          effect="solid"
          id="finalTooltip"
        >
          <NavigationPathTooltip
            networkEvent={navigationPath.final}
            parsedUrl={navigationPath.final.parsedUrl}
          />
        </ReactTooltip>
        <div className="url">
          {`${navigationPath.final.parsedUrl.protocol}//${navigationPath.final.parsedUrl.host + navigationPath.final.parsedUrl.pathname}`}
        </div>
      </li>
    </ul>
  </div>
);

NavigationPath.propTypes = {
  navigationPath: PropTypes.object.isRequired,
};

export default NavigationPath;
