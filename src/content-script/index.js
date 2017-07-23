import dataLayerConfig from '../config/data-layers.config';
import * as utils from './content-script-utils';

// Listen for messages from the Popup script
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.type === 'dataLayers') {
      // Load all potential data layers on the page
      const loadedDataLayers = utils.getDataLayers(dataLayerConfig.layers);

      sendResponse(loadedDataLayers);
    }
  });
