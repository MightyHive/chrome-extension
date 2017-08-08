class Tab {
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
    };
  }
  networkCalls(type) {
    if (type === 'tabContent') {
      return this._data.networkCalls.tabContent;
    }
    return this._data.networkCalls.all;
  }
  get(key) {
    return this._data[key];
  }
  getAll() {
    return this._data;
  }
  putNetworkCall(networkCall) {
    // Targets tab content requests, rather than subframe requests.
    if (networkCall.frameId === 0) {
      this._data.networkCalls.tabContent.push(networkCall);
    }
    this._data.networkCalls.all.push(networkCall);
  }
  putDataLayer(dataLayers) {
    this._data.dataLayers = dataLayers;
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

  deleteTab(tabId) {
    const deletedTab = this._storage[tabId];

    if (this._storage[tabId]) {
      this._size -= 1;
    }

    delete this._storage[tabId];

    return deletedTab;
  }

  getTab(tabId) {
    return this._storage[tabId];
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
