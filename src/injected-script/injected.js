import dataLayerConfig from '../config/data-layers.config';

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
        result.push({
          id: layer.id,
          key: layer.key,
          displayName: layer.displayName,
          type: layer.type,
          data: window[layer.key],
        });
      }
    });
    return result;
  }

  let userLayerList = [];
  // Look for user-defined data layers
  if (window._userLayerList) {
    userLayerList = window._userLayerList;
  }

  const combinedLayerConfig = dataLayerConfig.layers.concat(userLayerList);
  const loadedDataLayers = searchForDataLayers(combinedLayerConfig);


  // Create a custom DOM event to allow passing of data between the
  // content script and the injected script.
  const event = new CustomEvent('mh-data-layer-loaded', {
    detail: JSON.stringify(loadedDataLayers),
  });

  // Dispatch the event.
  document.body.dispatchEvent(event);
}

(() => {
  let timesToCheck = 40;
  getDataLayers();

  setTimeout(() => {
    console.log('timeout');
    if (timesToCheck > 0) {
      getDataLayers();
      timesToCheck -= 1;
    }
  }, 500);
})();
