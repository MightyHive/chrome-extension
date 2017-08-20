import * as UrlPattern from 'url-pattern';

import NetworkCallConfig from '../../config/network-call.config';

// Set a detailed URL parser for grabbing the root domain
const pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/*)');

/**
 * Determines if the network call matches a pattern for
 * a known tracker. Stored by host for constant-time access.
 */
function isTrackedHost(host) {
  return !!NetworkCallConfig.trackers[host];
}
/**
 * Represents a Google Chrome tab. Keeps track of relevant network activity,
 * data layers, and identifies marketing trackers.
 * @param {object} tabData - Initial tab data. Provides the Chrome tabId and current url.
 * @constructor
 */
export default class Tab {
  constructor(tabData) {
    this.id = tabData.tabId;
    this._data = {
      tabId: tabData.tabId,
      currentURL: tabData.url,
      dataLayers: [],
      networkCalls: {
        all: [],
        tabContent: [],
      },
      trackers: {},
    };
  }
  /**
   * Returns all network requests associated with the currently loaded URL.
   * @param {string} type - Passing 'tabContent' doesn't return subframe requests.
   */
  networkCalls(type) {
    if (type === 'tabContent') {
      return this._data.networkCalls.tabContent;
    }
    return this._data.networkCalls.all;
  }
  /**
   * Returns only the requested Tab property.
   * @param {string} tabProperty - A valid Tab property. See Tab data structure.
   */
  get(tabProperty) {
    return this._data[tabProperty];
  }
  /**
   * Returns all Tab data.
   */
  getAll() {
    return this._data;
  }
  /**
   * Returns all tracker data.
   */
  getTrackers() {
    return this._data.trackers;
  }
  /**
   * Parses and stores network calls and checks for known tracking origins.
   * @param {object} networkCall - A Google Chrome request object.
   */
  putNetworkCall(networkCall) {
    // Targets tab content requests, rather than subframe requests.
    if (networkCall.frameId === 0) {
      this._data.networkCalls.tabContent.push(networkCall);
    }
    this._data.networkCalls.all.push(networkCall);

    // Check for known tracker hosts
    let parsedURL;
    let rootHost;
    try {
      parsedURL = pattern(networkCall.url);
      // Gives us something like google.com
      rootHost = parsedURL.domain + parsedURL.tld;
      if (isTrackedHost(rootHost)) {
        this.putPotentialTracker(networkCall);
      }
    } catch (e) {
      console.error('Failed to parse Network Call', e);
    }
  }
  /**
   * Stores passed dataLayers as a property. Since this is bundled all at once
   * by the client, it simply overrides the property.
   * @param {object} dataLayers - Data Layers collected from the Window object.
   */
  putDataLayer(dataLayers) {
    this._data.dataLayers = dataLayers;
  }
  /**
   * Verifies if a network call is a tracker, and appends it separately under the
   * "trackers" property.
   * @param {object} networkCall - A Google Chrome request object.
   */
  putPotentialTracker(networkCall) {
    // TODO: verify network calls against potential strings
  }
}

