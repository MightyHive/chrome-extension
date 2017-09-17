import * as utils from './content-script-utils';
import * as chromeUtils from '../chrome.utils';

let loadedDataLayers = [];

// Listen for custom DOM event
document.body.addEventListener('mh-data-layer-loaded', (event) => {
  loadedDataLayers = JSON.parse(event.detail);
  utils.sendDataLayers(loadedDataLayers);
}, false);

try {
  chromeUtils.getFromStorage('userLayerList')
  .then((data) => {
    if (data && data.userLayerList) {
      const script = document.createElement('script');
      script.innerHTML = `window._userLayerList = ${JSON.stringify(data.userLayerList || [])};`;
      document.head.appendChild(script);
    }
    utils.injectJS(chrome.extension.getURL('injectedScript.js'));
  });
} catch (e) {}

// Respond to Extension requests for Data Layers
utils.messageListener((request, sender, sendResponse) => {
  if (request.type === 'dataLayers') {
    sendResponse(loadedDataLayers);
  }
});
