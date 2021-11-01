import {deactivateForms} from './form-states.js';
import {initFormValidation} from './form-validation.js';
import {map, onMapLoad} from './map.js';

deactivateForms();
map.on('load', onMapLoad);

initFormValidation();

