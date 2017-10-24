import equal from 'deep-equal';
import dataLayerConfig from '../config/data-layers.config';

((window) => {
  function getDataLayers() {
    /**
     * Iterates through the window object to find matches with
     * keys passed in via a config.
     * @param {array} layers - a list of potential data layers and keys
     */
    function searchForDataLayers(layers) {
      const result = [];
      layers.forEach((layer) => {
        if (layer.key in window) {
          let data = window[layer.key];

          // Not copying makes diffs impossible
          if (Array.isArray(data)) {
            data = data.slice();
          } else if (typeof data === 'object') {
            data = Object.assign({}, data);
          }

          result.push({
            id: layer.id,
            key: layer.key,
            displayName: layer.displayName,
            type: layer.type,
            data,
          });
        }
      });
      return result;
    }

    let customLayerList = [];
    // Look for user-defined data layers
    if (window._customLayerList) {
      customLayerList = window._customLayerList;
    }

    const combinedLayerConfig = dataLayerConfig.layers.concat(customLayerList);
    return searchForDataLayers(combinedLayerConfig);
  }
  /**
   * Sends data layers through a DOM event.
   * @param {object} data - data layers
   */
  function sendDataLayers(data) {
    // Create a custom DOM event to allow passing of data between the
    // content script and the injected script.
    const event = new CustomEvent('mh-data-layer-loaded', {
      detail: JSON.stringify(data),
    });

    // Dispatch the event.
    document.body.dispatchEvent(event);
  }

  let timesToCheck = 40;
  let loadedDataLayers = getDataLayers();
  sendDataLayers(loadedDataLayers);

  // Checks for 20 seconds if there is new Data Layers loaded
  function checkForDataLayers() {
    setTimeout(() => {
      if (timesToCheck > 0) {
        const tempDataLayers = getDataLayers();

        // Avoid duplicate "change" events triggering on the BG script
        if (!equal(tempDataLayers, loadedDataLayers)) {
          loadedDataLayers = tempDataLayers;
          sendDataLayers(loadedDataLayers);
        }

        timesToCheck -= 1;
        checkForDataLayers();
      } else {
        sendDataLayers('complete');
      }
    }, 500);
  }

  checkForDataLayers();
})(window);
