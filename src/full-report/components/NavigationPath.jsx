import React from 'react';
import PropTypes from 'prop-types';
import * as url from 'url';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ReactTooltip from 'react-tooltip';

// Components
import NavigationPathTooltip from './NavigationPathTooltip';

const NavigationPath = ({ navigationPath }) => {
  const finalUrl = url.parse(navigationPath.final.url, true);

  return (
    <div className="navigationPathContainer">
      <ul className="navigationPath">
        {navigationPath.redirects.map((redirect) => {
          const parsedRedirect = url.parse(redirect.url, true);
          const requestKey = `navPath-${redirect.requestId}-${redirect.timeStamp}`;
          const tooltipId = `${requestKey}-tooltip`;
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
                  {redirect.statusCode}
                </div>
                <ReactTooltip
                  place="bottom"
                  type="dark"
                  effect="solid"
                  id={tooltipId}
                >
                  <NavigationPathTooltip
                    networkEvent={redirect}
                    parsedUrl={parsedRedirect}
                  />
                </ReactTooltip>
                <div className="url">{parsedRedirect.host + parsedRedirect.pathname}</div>
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
            {navigationPath.final.statusCode}
          </div>
          <ReactTooltip
            place="bottom"
            type="dark"
            effect="solid"
            id="finalTooltip"
          >
            <NavigationPathTooltip
              networkEvent={navigationPath.final}
              parsedUrl={finalUrl}
            />
          </ReactTooltip>
          <div className="url">{finalUrl.host + finalUrl.pathname}</div>
        </li>
      </ul>
    </div>
  );
};

NavigationPath.propTypes = {
  navigationPath: PropTypes.object.isRequired,
};

export default NavigationPath;
