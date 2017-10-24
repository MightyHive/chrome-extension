import * as utils from '../chrome.utils';

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
    storage.putDataLayer(sender.tab.id, request.body);
    sendResponse({ status: 200 });
  }

  function getTab(request, sender, sendResponse) {
    const data = storage.getTabData(request.body.tabId);
    // Check if data has been modified
    const tabTimestamp = data._lastModified;
    if (request.body.timestamp && request.body.timestamp === tabTimestamp) {
      return sendResponse({ status: 304 });
    }

    if (data) {
      return sendResponse({ data, status: 200 });
    }

    return sendResponse({ status: 404, error: 'Tab data not found.' });
  }

  // Data Layers Controller
  runtimeListener('/POST/data-layers', addDataLayers);
  runtimeListener('/GET/tab', getTab);

  chrome.runtime.onConnect.addListener((port) => {
    // Due to API restrictions, this is the only way to send this data
    let listener;
    const tabId = Number(port.name);
    const initialData = storage.getTabData(tabId);

    if (!initialData) {
      port.postMessage({ error: new Error('Tab data not found.') });
    }

    // Request data layers be updated if polling is finished for any new connection
    utils.sendTabMessage(tabId, { type: 'updateDataLayers' });

    storage.addListener(tabId, (data, listenerId) => {
      const sentData = { data };
      // Simple way to detect navigation changes
      if (data._requestId !== initialData._requestId) {
        sentData.navigationChange = true;
      }

      port.postMessage(sentData);
      listener = listenerId;
    });
    // Remove the listener when the connection closes
    port.onDisconnect.addListener((event) => {
      if (event.error) {
        console.log(`Disconnected due to an error: ${event.error.message}`);
      }
      console.log(`Closing connection for Tab ${tabId}`);
      storage.removeListener(tabId, listener);
    });
    port.onMessage.addListener((msg) => {
      console.log('Message from port-->', msg);
    });
  });
}
