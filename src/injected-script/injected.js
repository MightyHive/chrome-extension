import dataLayerConfig from '../config/data-layers.config';
import * as utils from './injected-script-utils';

// Listen for messages from the Popup script
const loadedDataLayers = utils.getDataLayers(dataLayerConfig.layers);

// Create a custom DOM event to allow passing of data between the
// content script and the injected script.
const event = new CustomEvent('mh-data-layer-loaded', {
  detail: JSON.stringify(loadedDataLayers),
});

// Dispatch the event.
document.body.dispatchEvent(event);
