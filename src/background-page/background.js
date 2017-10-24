import initializeEventListeners from './events';
import TabStorage from './storage/TabStorage';
import controllers from './controllers';

const storage = new TabStorage();

initializeEventListeners(storage);
controllers(storage);

// Debugging purposes. Only accessible within the BG Script debugger.
window.bg_storage = storage;
