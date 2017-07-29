/**
 * Iterates through the window object to find matches with
 * keys passed in via a config.
 * @param {array} layers - a list of potential data layers and keys
 */
export function getDataLayers(layers) {
  const result = [];
  layers.forEach((layer) => {
    if (layer.key in window) {
      result.push({
        id: layer.id,
        key: layer.key,
        displayName: layer.displayName,
        data: window[layer.key],
      });
    }
  });
  return result;
}
