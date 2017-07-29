import * as utils from './content-script-utils';
// Listen for custom DOM event
document.body.addEventListener('mh-data-layer-loaded', (event) => {
  console.log('Event received by Content script:', JSON.parse(event.detail));
}, false);

utils.injectJS(chrome.extension.getURL('injectedScript.js'));
