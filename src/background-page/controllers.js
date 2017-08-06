function runtimeListener(endpoint, callback) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.endpoint && request.endpoint === endpoint) {
      callback(request, sender, sendResponse);
    }
  });
}

/**
 * The Background script is designed to run like a web server,
 * since it essentially performs the same tasks. Thus, most of the data transfered
 * back and forth between services follows a server-like API. Not all aspects of HTTP
 * are followed, however. The most notable difference is the way that endpoints are structured.
 * There is not a fully separate "Headers" object as of yet, and thus the
 * different request methods are put into the endpoints themselves.
 *
 * This is another deviation, as there is no "endpoint" property in HTTP requests. However,
 * there is strictly speaking no real URI available so "endpoint" is the closest terminology
 * while avoiding complete conflation of the two.
 */
export default function controllers(storage) {
  function addDataLayers(request, sender, sendResponse) {
    storage.putDataLayer(request.body);
    sendResponse({ status: 200 });
  }
  function getTab(request, sender, sendResponse) {
    const data = storage.getTabData(request.body.tabId);
    if (data) {
      sendResponse({ data, status: 200 });
    } else {
      sendResponse({ status: 404, error: 'Tab data not found.' });
    }
  }

  // Data Layers Controller
  runtimeListener('/POST/data-layers', addDataLayers);
  runtimeListener('/GET/tab', getTab);
}
