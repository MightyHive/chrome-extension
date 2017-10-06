function isNavigationRequest(details) {
  return details.frameId === 0 && details.type === 'main_frame';
}

export default function initializeEventListeners(storage) {
  const events = {
    webRequest: {
      onBeforeRequest: (details) => {
        try {
          if (isNavigationRequest(details)) {
            storage.tabNavigation(details);
          }
        } catch (e) {
          console.error('Request Listener Error', e);
        }
      },
      onBeforeRedirect: (details) => {
        try {
          storage.putNetworkCall(details);

          if (isNavigationRequest(details)) {
            storage.tabRedirect(details);
          }
        } catch (e) {
          console.error('Request Listener Error', e);
        }
      },
      onCompleted: (details) => {
        try {
          storage.putNetworkCall(details);
          if (isNavigationRequest(details)) {
            storage.tabNavigationComplete(details);
          }
        } catch (e) {
          console.error('Request Listener Error', e);
        }
      },
    },
    tabs: {
      onRemoved: (tabId) => {
        try {
          console.info('TAB CLOSED-> ', tabId);
          storage.deleteTab(tabId);
        } catch (e) {
          console.error('Tab Deletion Listener Error', e);
        }
      },
    },
  };

  chrome.webRequest.onBeforeRequest.addListener(events.webRequest.onBeforeRequest, { urls: ['*://*/*'] });
  chrome.webRequest.onBeforeRedirect.addListener(events.webRequest.onBeforeRedirect, { urls: ['*://*/*'] });
  chrome.webRequest.onCompleted.addListener(events.webRequest.onCompleted, { urls: ['*://*/*'] });
  chrome.tabs.onRemoved.addListener(events.tabs.onRemoved);
}
