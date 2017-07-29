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
