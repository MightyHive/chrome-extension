export function messageListener(response, callback) {
  return chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      sendResponse({
        farewell: 'goodbye',
      });
      callback(request.data);
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
export function getActiveTabData() {
  return new Promise((resolve) => {
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, (tabs) => {
      chrome.runtime.sendMessage({
        endpoint: '/GET/tab',
        body: {
          tabId: tabs[0].id,
        },
      }, (response) => {
        console.log(response);
        resolve(response.data);
      });
    });
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
