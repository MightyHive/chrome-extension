/**
 * Injects JavaScript into the DOM, allowing it to run outside of
 * the restraints of the Content Script and Popup script execution environments
 * and access the page's Window object.
 * @param {string} url - URL source of the script to inject.
 */
export function injectJS(url) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  (document.head || document.body || document.documentElement).appendChild(script);
}
