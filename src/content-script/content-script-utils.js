/**
 * Iterates through the window object to find matches with
 * keys passed in via a config.
 * @param {array} layers - a list of potential data layers and keys
 */
export function getDataLayers(layers) {
  return layers.filter((layer) => {
    if (layer.key in window) {
      return window[layer.key];
    }
  });
}
