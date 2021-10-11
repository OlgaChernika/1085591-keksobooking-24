import {PATH, ADS_LIST_LENGTH} from './data.js';
import {shuffle} from './utils.js';

const createAvatarPathArray = () => {
  const array = [];
  for (let i = 1; i <= ADS_LIST_LENGTH; i++) {
    if (i < ADS_LIST_LENGTH) {
      i = `0${i}`;
    }
    array.push(`${PATH}${i}.png`);
  }
  return shuffle(array);
};

const pathArray = createAvatarPathArray();

export {pathArray};
