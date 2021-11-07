import {deactivateForms, activateForms} from './form-states.js';
import {initMap} from './map.js';


const filterForm = document.querySelector('.map__filters');

deactivateForms();
activateForms(filterForm);
initMap();
