import Tab from './Tab';

/**
 * Provides a set of APIs for creating, updating, and retrieving
 * data related to Tab data.
 * @constructor
 */
export default class TabStorage {
  constructor() {
    this._storage = {};
    this._listeners = {};
    this._listenerId = 0;
    this._size = 0;
  }
  /**
   * Adds a listener that emits Tab data when an update is registered with that Tab.
   * @param {number} tabId - Unique Chrome Tab ID number. Not based on tab order.
   */
  addListener(tabId, callback) {
    // Deny undefined tabs to avoid memory leaks
    if (!this._storage[tabId]) {
      console.error(`Tab ${tabId} not found. No listener added.`);
      return;
    }
    // Check if the tabId exists in the listeners storage
    if (!this._listeners[tabId]) {
      this._listeners[tabId] = [];
    }

    this._listeners[tabId].push({
      listenerId: this._listenerId,
      callback,
    });
    this._listenerId += 1;
    // Send the initial data so the listener has that and the listenerId;
    this.registerUpdate(tabId);
  }
  /**
   * Removes an existing listener
   * @param {number} tabId - Unique Chrome Tab ID number. Not based on tab order.
   * @param {number} listenerId - Unique listener Id.
   */
  removeListener(tabId, targetListenerId) {
    if (this._listeners[tabId] && this._listeners[tabId].length > 0) {
      const index = this._listeners[tabId]
          .findIndex(({ listenerId }) => listenerId === targetListenerId);

      if (index === -1) {
        console.warn(`Listener ${targetListenerId} not found for tab ${tabId}`);
        return;
      }
      // Remove the listener
      this._listeners[tabId].splice(index, 1);

      if (this._listeners[tabId].length <= 0) {
        delete this._listeners[tabId];
      }
    }
  }
  /**
   * Registers an update to a tabId.
   * @param {number} tabId - Unique Chrome Tab ID number. Not based on tab order.
   */
  registerUpdate(tabId) {
    try {
      if (this._listeners[tabId] && this._listeners[tabId].length > 0) {
        this._listeners[tabId].forEach(({ listenerId, callback }) => {
          let tabData = this.getTabData(tabId);

          if (!tabData) {
            tabData = { error: new Error('Tab data not found.') };
          }
          callback(tabData, listenerId);
        });
      }

      chrome.browserAction.setBadgeText({
        text: this._storage[tabId]._data.trackerCount.toString(),
        tabId,
      });
    } catch (e) {
      console.error('Error registering update: ', e);
    }
  }
  /**
   * Creates a record of a Chrome Tab. Note that this method overrides the existing
   * Tab. This is because Tab storage data is only relevant for the current URL it is
   * on. There is no present need to have Tabs persist data from page to page.
   * @param {object} tabData - data object provided by Chrome's onBeforeNavigate event.
   * @param {number} tabData.tabId - Unique Chrome Tab ID number. Not based on tab order.
   */
  createTab(tabData) {
    const tab = new Tab(tabData);

    if (!this._storage[tabData.tabId]) {
      this._size += 1;
    }

    this._storage[tabData.tabId] = tab;

    return tab;
  }
  /**
   * Registers a Tab navigation event and determines if the Tab needs to be recreated
   * or if it needs to be updated (redirect not yet finished).
   * @param {object} tabData - data object provided by Chrome's onBeforeNavigate event.
   * @param {number} tabData.tabId - Unique Chrome Tab ID number. Not based on tab order.
   */
  tabNavigation(tabData) {
    if (!this._storage[tabData.tabId]) {
      return this.createTab(tabData);
    }

    if (this._storage[tabData.tabId]._requestId !== tabData.requestId) {
      return this.createTab(tabData);
    }

    return false;
  }
  /**
   * Registers a Tab navigation redirect event.
   * @param {object} tabData - data object provided by Chrome's onBeforeNavigate event.
   * @param {number} tabData.tabId - Unique Chrome Tab ID number. Not based on tab order.
   */
  tabRedirect(tabData) {
    const tab = this._storage[tabData.tabId];
    if (!tab) {
      throw new Error(`Error with tabRedirect: Tab with ID ${tabData.tabId} not found!`);
    }

    tab.putRedirect(tabData);
  }
  /**
   * Registers a Tab navigation redirect event.
   * @param {object} tabData - data object provided by Chrome's onBeforeNavigate event.
   * @param {number} tabData.tabId - Unique Chrome Tab ID number. Not based on tab order.
   */
  tabNavigationComplete(tabData) {
    const tab = this._storage[tabData.tabId];
    if (!tab) {
      throw new Error(`Error with tabNavigationComplete: Tab with ID ${tabData.tabId} not found!`);
    }

    tab.putNavigationComplete(tabData);
  }
  /**
   * Deletes a Tab given a valid tabId.
   * @param {number} tabId - Unique Chrome Tab ID number.
   */
  deleteTab(tabId) {
    const deletedTab = this._storage[tabId];

    if (this._storage[tabId]) {
      this._size -= 1;
      delete this._storage[tabId];
    }

    if (this._listeners[tabId]) {
      delete this._listeners[tabId];
    }

    return deletedTab;
  }
  /**
   * Returns a Tab instance given a valid tabId.
   * @param {number} tabId - Unique Chrome Tab ID number.
   * @returns {(Object|undefined)} Tab -  Tab instance or undefined
   * if the tabId is not found.
   */
  getTabData(tabId) {
    if (this._storage[tabId]) {
      return this._storage[tabId].getAll();
    }
    return undefined;
  }
  /**
   * Stores network call information for a given Tab.
   * @param {object} networkCall - Chrome onCompleted event details object.
   */
  putNetworkCall(networkCall) {
    const tab = this._storage[networkCall.tabId];

    if (tab) {
      tab.putNetworkCall(networkCall);
      this.registerUpdate(networkCall.tabId);
    }
  }
  /**
   * Stores data layer information for a given Tab. This data is collected from
   * the client's Window object and passed via DOM events to the Content Script.
   * @param {object} dataLayers - Data Layers collected from the Window object.
   */
  putDataLayer(tabId, dataLayer) {
    const tab = this._storage[tabId];

    if (tab && dataLayer) {
      tab.putDataLayer(dataLayer);
      this.registerUpdate(tabId);
    }
  }
  /**
   * @return {number} size - Current number of Tabs in storage.
   */
  get size() {
    return this._size;
  }
}
