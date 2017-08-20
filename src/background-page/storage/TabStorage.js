import Tab from './Tab';

/**
 * Provides a set of APIs for creating, updating, and retrieving
 * data related to Tab data.
 * @constructor
 */
export default class TabStorage {
  constructor() {
    this._storage = {};
    this._size = 0;
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
   * Deletes a Tab given a valid tabId.
   * @param {number} tabId - Unique Chrome Tab ID number.
   */
  deleteTab(tabId) {
    const deletedTab = this._storage[tabId];

    if (this._storage[tabId]) {
      this._size -= 1;
      delete this._storage[tabId];
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
    }
  }
  /**
   * Stores data layer information for a given Tab. This data is collected from
   * the client's Window object and passed via DOM events to the Content Script.
   * @param {object} dataLayers - Data Layers collected from the Window object.
   */
  putDataLayer(tabId, dataLayer) {
    const tab = this._storage[tabId];

    if (tab) {
      tab.putDataLayer(dataLayer);
    }
  }
  /**
   * @return {number} size - Current number of Tabs in storage.
   */
  get size() {
    return this._size;
  }
}
