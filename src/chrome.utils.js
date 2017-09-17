export function messageListener(response, callback) {
  return chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      sendResponse({
        farewell: 'goodbye',
      });
      callback(request.data);
    });
}

/**
 * Get active tab ID.
 */
export function getActiveTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, (tabs) => {
      resolve(tabs[0].id);
    });
  });
}

export function sendActiveTabMessage(message, callback) {
  chrome.tabs.query({
    active: true,
    currentWindow: true,
  }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
      callback(response);
    });
  });
}

/**
 * Requests data from the current active tab from the Background page.
 * @param {function} callback - function called when listener is triggered.
 */
export function getActiveTabData(timestamp = null) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, (tabs) => {
      chrome.runtime.sendMessage({
        endpoint: '/GET/tab',
        body: {
          tabId: tabs[0].id,
          timestamp,
        },
      }, (response) => {
        if (response.status === 200) {
          resolve(response.data);
        // 304 indicates data hasn't been modified since last request
        } else if (response.status === 304) {
          resolve(null, response.status);
        } else {
          reject(response);
        }
      });
    });
  });
}

/**
 * Requests data from the current active tab from the Background page.
 * This function uses a long-term stream rather than a one-time connection.
 */
export function activeTabConnection(callback) {
  getActiveTab()
  .then((activeTabId) => {
    const port = chrome.runtime.connect({ name: activeTabId.toString() });
    port.onMessage.addListener(message => callback(message));
  });
}

/**
 * Requests data from the tab id passed in from the Background page.
 * @param {function} callback - function called when listener is triggered.
 */
export function getTabData(tabId) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({
      endpoint: '/GET/tab',
      body: {
        tabId,
      },
    }, (response) => {
      resolve(response.data);
    });
  });
}
/**
 * Initiates a Chrome user download from data.
 * @param {function} callback - called with the id of the new DownloadItem.
 * See: https://developer.chrome.com/extensions/downloads#method-download
 */
export function downloadData(data, options = {}) {
  return new Promise((resolve) => {
    const base64Token = options.isBase64 ? ';base64,' : '';
    const mediatype = options.mediatype || 'text/plain,';
    const url = `data:${mediatype + base64Token + data}`;
    chrome.downloads.download({
      url,
      saveAs: options.saveAs || false,
    }, (response) => {
      resolve(response.data);
    });
  });
}

export function executeJSOnPage(script) {
  chrome.tabs.query({
    active: true,
    currentWindow: true,
  }, (tabs) => {
    chrome.tabs.executeScript(tabs[0].id, {
      file: script,
    });
  });
}

/**
 * Saves key/value pairs to Chrome Sync storage.
 * @param {object} data
 * See: https://developer.chrome.com/extensions/storage
 */
export function saveToStorage(data) {
  return new Promise((resolve, reject) => {
    if (typeof data !== 'object' || data === null) {
      reject(new Error('Incorrect data type. Storage data must be an object'));
    }

    try {
      chrome.storage.sync.set(data, () => resolve());
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Retrieves key(s) from Chrome Sync storage.
 * @param {string|array|object} key(s) - A single key to get, list of keys to get,
 * or a dictionary specifying default values.
 *
 * See: https://developer.chrome.com/extensions/storage
 */
export function getFromStorage(key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, data => resolve(data));
    } catch (e) {
      reject(e);
    }
  });
}
