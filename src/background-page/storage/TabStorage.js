import Tab from './Tab';

export default class TabStorage {
  constructor() {
    this._storage = {};
    this._size = 0;
  }

  createTab(tabData) {
    const tab = new Tab(tabData);

    if (!this._storage[tabData.tabId]) {
      this._size += 1;
    }

    this._storage[tabData.tabId] = tab;

    return tab;
  }

  deleteTab(tabId) {
    const deletedTab = this._storage[tabId];

    if (this._storage[tabId]) {
      this._size -= 1;
      delete this._storage[tabId];
    }

    return deletedTab;
  }

  getTabData(tabId) {
    if (this._storage[tabId]) {
      return this._storage[tabId].getAll();
    }
    return undefined;
  }

  putNetworkCall(networkCall) {
    const tab = this._storage[networkCall.tabId];

    if (tab) {
      tab.putNetworkCall(networkCall);
    }
  }

  putDataLayer(tabId, dataLayer) {
    const tab = this._storage[tabId];

    if (tab) {
      tab.putDataLayer(dataLayer);
    }
  }

  get size() {
    return this._size;
  }
}
