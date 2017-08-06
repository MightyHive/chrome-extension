/**
 * Injects JavaScript into the DOM, allowing it to run outside of
 * the restraints of the Content Script and Popup script execution environments
 * and access the page's Window object.
 * @param {string} url - URL source of the script to inject.
 */
export function injectJS(url) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  (document.head || document.body || document.documentElement).appendChild(script);
}

/**
 * Listens for a message from the Chrome extension.
 * @param {function} callback - function called when listener is triggered.
 */
export function messageListener(callback) {
  chrome.runtime.onMessage.addListener(callback);
}

/**
 * Sends a message to the Chrome extension runtime.
 * @param {function} callback - function called when listener is triggered.
 */
export function sendDataLayers(data) {
  chrome.runtime.sendMessage({
    endpoint: '/POST/data-layers',
  },
  data);
}
