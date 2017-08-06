class Tab {
  constructor(tabData) {
    this.id = tabData.tabId;
    this._data = {
      id: tabData.tabId,
      currentURL: tabData.url,
      dataLayers: [],
      networkCalls: [],
    };
  }
  get(key) {
    return this._data[key];
  }
  getAll() {
    return this._data;
  }
  putNetworkCall(networkCall) {
    this._data.networkCalls.push(networkCall);
  }
}

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

  deleteTab(id) {
    const deletedTab = this._storage[id];

    if (this._storage[id]) {
      this._size -= 1;
    }

    delete this._storage[id];

    return deletedTab;
  }

  getTab(id) {
    return this._storage[id];
  }

  putNetworkCall(networkCall) {
    const tab = this._storage[networkCall.tabId];
    if (tab) {
      tab.putNetworkCall(networkCall);
    }
  }

  putDataLayer(dataLayer) {
    const tab = this._storage[dataLayer.tabId];
    if (tab) {
      tab.putDataLayer(dataLayer);
    }
  }

  get size() {
    return this._size;
  }
}
