import minimatch from 'minimatch';
import parseDomain from 'parse-domain';
import * as url from 'url';

import QueryParserConfig from '../../config/query-parsers.config';

/**
 * Represents a Network Event in Chrome. Contains the given network data while also
 * parsing to allow for easy matching.
 * @param {object} networkCall - Network call data provided by the onCompleted event
 * in the Chrome webRequest API.
 * See: https://developer.chrome.com/extensions/webRequest#event-onCompleted
 * @constructor
 */
export default class NetworkCall {
  constructor(networkCall) {
    // Place the most common data as a direct property
    this.tabId = networkCall.tabId;
    this.url = networkCall.url;
    // All other details placed under the data property
    this.data = Object.assign({}, networkCall);
    // Combine two separate data sources.
    // parseDomain gives more advanced domain-specific data
    const parsedDomain = parseDomain(this.url);
    const parsedUrl = url.parse(this.url, true);
    this.parsedUrl = Object.assign(
      {
        domain: parsedDomain.domain,
        tld: parsedDomain.tld,
        rootHost: `${parsedDomain.domain}.${parsedDomain.tld}`,
      },
      parsedUrl,
    );
    // Check for custom query parser
    this.customQueryParser();
  }
  /**
   * Returns a single value from the network call data.
   * @return {string|number} - networkData
   */
  get(networkData) {
    return this.data[networkData];
  }
  /**
   * Returns the "root host", which is the domain + TLD.
   * Example: google.com or google.co.uk.
   * Note: Subdomains are NOT included.
   */
  get rootHost() {
    return this.parsedUrl.rootHost;
  }
  /**
   * Determines if the network call came from the Tab content
   * itself or a subframe.
   * @return {boolean} - isTabContent
   */
  get isTabContent() {
    return this.data.frameId === 0;
  }
  /**
   * Determines if the network call is configured to use a custom parser.
   */
  customQueryParser() {
    const trackedHost = QueryParserConfig.parsers[this.parsedUrl.rootHost];

    if (trackedHost) {
      trackedHost.forEach((trackedParser) => {
        // Verify the match
        if (this.match(trackedParser.pattern)) {
          this.parsedUrl.query = trackedParser.parser(this.parsedUrl.path);
        }
      });
    }
  }
  /**
   * Determines if the network call pathname matches a given pattern.
   * @return {boolean} - match
   */
  match(pattern) {
    const hostAndPath = this.parsedUrl.hostname + this.parsedUrl.pathname;
    return minimatch(hostAndPath, pattern);
  }
  /**
   * Determines if the network call pathname matches a given pattern.
   * @return {boolean} - match
   */
  matchPathname(pattern) {
    return minimatch(this.parsedUrl.pathname, pattern);
  }
}

