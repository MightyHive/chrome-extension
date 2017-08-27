import initializeEventListeners from './events';
import TabStorage from './storage/TabStorage';
import controllers from './controllers';

const storage = new TabStorage();

initializeEventListeners(storage);
controllers(storage);

// Debugging purposes
window.bg_storage = storage;
