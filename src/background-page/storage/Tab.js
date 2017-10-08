import NetworkCallConfig from '../../config/network-call.config';
import ContainerConfig from '../../config/container.config';
import NetworkCall from './NetworkCall';

/**
 * Determines if the network call matches a pattern for
 * a known tracker. Stored by host for constant-time access.
 */
function isTrackedHost(host, type) {
  if (type === 'tracker') {
    return !!NetworkCallConfig.trackers[host];
  }

  if (type === 'container') {
    return !!ContainerConfig.containers[host];
  }

  throw new Error('No tracked host type');
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
    this._requestId = tabData.requestId;
    this._data = {
      tabId: tabData.tabId,
      currentURL: tabData.url,
      _requestId: tabData.requestId,
      navigationPath: {
        initial: tabData,
        redirects: [],
        final: undefined,
      },
      dataLayers: [],
      networkCalls: {
        all: [],
        tabContent: [],
      },
      trackers: {},
      trackerCount: 0,
      containers: [],
      _lastModified: new Date().getTime(),
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
   * Updates last modified timestamp
   */
  registerUpdate() {
    this._data._lastModified = new Date().getTime();
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
   * Registers a redirect request for the main navigation path.
   * @param {object} requestData - Web request data provided by Chrome.
   */
  putRedirect(requestData) {
    this._data.navigationPath.redirects.push(requestData);
  }
  /**
   * Registers navigation being complete.
   * @param {object} dataLayers - Web request data provided by Chrome.
   */
  putNavigationComplete(requestData) {
    this._data.navigationPath.final = requestData;
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
    this.registerUpdate();

    try {
      const { rootHost } = networkCall.parsedUrl;
      if (isTrackedHost(rootHost, 'tracker')) {
        this.putPotentialTracker(networkCall);
      }
      if (isTrackedHost(rootHost, 'container')) {
        this.putPotentialContainer(networkCall);
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
    this.registerUpdate();
  }
  /**
   * Verifies if a network call is a tracker, and appends it separately under the
   * "trackers" property.
   * @param {object} networkCall - A Google Chrome request object.
   */
  putPotentialTracker(networkCall) {
    try {
      const tabTrackers = this._data.trackers;
      const rootHost = networkCall.parsedUrl.rootHost;
      const trackedHost = NetworkCallConfig.trackers[rootHost];
      // Iterate through them, attempting to match with the Call.
      trackedHost.forEach((tracker) => {
        const trackerId = tracker.trackerId;
        tracker.matches.some((pattern) => {
          // Verify the network call is one that is a tracker
          if (networkCall.match(pattern)) {
            // Place in the trackers if existing
            if (tabTrackers[trackerId]) {
              tabTrackers[trackerId].push(networkCall);
            } else {
              tabTrackers[trackerId] = [networkCall];
              this._data.trackerCount += 1;
            }
            return true;
          }
          return false;
        });
      });
    } catch (e) {
      console.error('Error parsing potential tracker', e);
    }
    this.registerUpdate();
  }
  /**
   * Verifies if a network call has a container.
   * @param {object} networkCall - A Google Chrome request object.
   */
  putPotentialContainer(networkCall) {
    try {
      const rootHost = networkCall.parsedUrl.rootHost;
      const trackedHost = ContainerConfig.containers[rootHost];
      // Iterate through them, attempting to match with the Call.
      trackedHost.forEach((container) => {
        container.matches.some((pattern) => {
          // Verify the network call is one that is a container
          if (networkCall.match(pattern)) {
            this._data.containers.push(container.parser(networkCall));
            return true;
          }
          return false;
        });
      });
    } catch (e) {
      console.error('Error parsing potential container', e);
    }
    this.registerUpdate();
  }
}

