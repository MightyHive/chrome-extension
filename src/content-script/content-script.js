import * as utils from './content-script-utils';
import * as chromeUtils from '../chrome.utils';

let loadedDataLayers = [];
let loadComplete = false;

// Listen for custom DOM event
document.body.addEventListener('mh-data-layer-loaded', (event) => {
  loadedDataLayers = JSON.parse(event.detail);
  // TODO: don't overwrite data type sent
  if (loadedDataLayers === 'complete') {
    loadComplete = true;
    return;
  }
  utils.sendDataLayers(loadedDataLayers);
}, false);

function injectScript() {
  try {
    console.log('running inject script');
    chromeUtils.getFromStorage('customLayerList')
    .then((data) => {
      if (data && data.customLayerList) {
        const script = document.createElement('script');
        script.classList.add('mh_injectedScript');
        script.innerHTML = `window._customLayerList = ${JSON.stringify(data.customLayerList || [])};`;
        document.head.appendChild(script);
      }
      utils.injectJS(chrome.extension.getURL('injectedScript.js'), 'mh_injectedScript');
    });
  } catch (e) {}
}

function cleanup() {
  const classes = document.getElementsByClassName('mh_injectedScript');

  for (let i = 0; i < classes.length; i++) {
    classes[i].parentNode.removeChild(classes[i]);
  }
}

injectScript();

// Respond to Extension requests for updating Data Layers
utils.messageListener((request) => {
  // Only update if loading is complete
  if (request.type === 'updateDataLayers' && loadComplete === true) {
    cleanup();
    injectScript();
  }
});
