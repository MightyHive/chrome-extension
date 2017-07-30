import * as utils from './content-script-utils';

let loadedDataLayers = [];

// Listen for custom DOM event
document.body.addEventListener('mh-data-layer-loaded', (event) => {
  loadedDataLayers = JSON.parse(event.detail);
}, false);

utils.injectJS(chrome.extension.getURL('injectedScript.js'));

// Respond to Extension requests for Data Layers
utils.messageListener((request, sender, sendResponse) => {
  if (request.type === 'dataLayers') {
    sendResponse(loadedDataLayers);
  }
});
