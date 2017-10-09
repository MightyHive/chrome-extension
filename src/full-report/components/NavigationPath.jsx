import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as url from 'url';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

export default class NavigationPath extends Component {
  static propTypes = {
    navigationPath: PropTypes.object.isRequired,
  }

  render() {
    const { navigationPath } = this.props;
    const finalUrl = url.parse(navigationPath.final.url);

    return (
      <div className="navigationPathContainer">
        <ul className="navigationPath">
          {navigationPath.redirects.map((redirect) => {
            const parsedRedirect = url.parse(redirect.url);
            return (
              <li className="redirect clearfix">
                <div
                  style={{
                    float: 'left',
                    paddingRight: '44px',
                  }}
                >
                  <div className="statusCode">{redirect.statusCode}</div>
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
            <div className="statusCode">{navigationPath.final.statusCode}</div>
            <div className="url">{finalUrl.host + finalUrl.pathname}</div>
          </li>
        </ul>
      </div>
    );
  }
}
