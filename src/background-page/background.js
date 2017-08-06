import { initializeEventListeners } from './events';
import TabStorage from './storage';

const storage = new TabStorage();

initializeEventListeners(storage);

window.bg_storage = storage;
