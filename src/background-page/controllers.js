import * as utils from '../chrome.utils';

/**
 * Registers a new event listener for one-time requests from other parts of the Extension.
 * @param {string} action - the action to check for on requests. "action" is a prop of the request.
 * @param {function} callback - the function that handles the request.
 * See: https://developer.chrome.com/extensions/messaging
 */
function messageListener(action, callback) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action && request.action === action) {
      callback(request, sender, sendResponse);
    }
  });
}

/**
 * Long-term connection listener. Currently, long-term connections are only used for getting
 * tab information. No other actions are available via the long-term connection.
 * @param {TabStorage} storage - the storage API used by the BG Script to maintain state.
 */
function connectionListener(storage) {
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
        console.error(`Disconnected due to an error: ${event.error.message}`);
      }
      console.log(`Closing connection for Tab ${tabId}`);
      storage.removeListener(tabId, listener);
    });
  });
}

/**
 * Listens for long-term connections and one-time messages sent from Content Scripts, Popup page,
 * or other pages and resolves the various requests. This is the primary gateway through which the
 * Background Script communicates with the rest of the Extension, similar to a server.
 */
export default function controllers(storage) {
  function addDataLayers(request, sender, sendResponse) {
    storage.putDataLayer(sender.tab.id, request.data);
    sendResponse({ success: true });
  }

  // Data Layers Controller
  messageListener('post-data-layers', addDataLayers);
  connectionListener(storage);
}
