export function initializeEventListeners(storage) {
  const events = {
    webRequest: {
      onCompleted: (details) => {
        try {
          console.log('NETWORK->', details);
          storage.putNetworkCall(details);
        } catch (e) {
          console.error('Request Listener Error', e);
        }
      },
    },
    webNavigation: {
      onBeforeNavigate: (details) => {
        try {
          // Determine if navigation event occured in the tab content window.
          // This allows us to target user navigation events, rather than
          // iframe events.
          if (details.frameId === 0) {
            console.info('USER NAVIGATION EVENT-> ', details);
            storage.createTab(details);
          }
        } catch (e) {
          console.error('Navigation Listener Error', e);
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

  chrome.webRequest.onCompleted.addListener(events.webRequest.onCompleted, { urls: ['*://*/*'] });
  chrome.webNavigation.onBeforeNavigate.addListener(events.webNavigation.onBeforeNavigate);
  chrome.tabs.onRemoved.addListener(events.tabs.onRemoved);
}
