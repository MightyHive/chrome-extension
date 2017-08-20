import NetworkCallConfig from '../../config/network-call.config';
import NetworkCall from './NetworkCall';

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
      trackerSize: 0,
    };
  }
  /**
   * Returns all network requests associated with the currently loaded URL.
   * @param {string=} type - Passing 'tabContent' doesn't return subframe requests.
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
  putNetworkCall(requestData) {
    const networkCall = new NetworkCall(requestData);
    // Targets tab content requests, rather than subframe requests.
    if (networkCall.isTabContent) {
      this._data.networkCalls.tabContent.push(networkCall);
    }
    this._data.networkCalls.all.push(networkCall);

    try {
      if (isTrackedHost(networkCall.rootHost)) {
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
    // If tracker has endpoints
     // Iterate through them, attempting to match with the Call.
  }
}

