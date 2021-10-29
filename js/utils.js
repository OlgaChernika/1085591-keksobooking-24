export const getRandomInt = (min, max, length = 0) => {
  if (min >= max || min < 0 || max <= 0) {
    return false;
  }
  return (Math.random() * (max - min) + min).toFixed(length);
};

export const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

export const wordEndings = {
  'roomsEndings': {
    firstState: 'комнат',
    secondState: 'комната',
    thirdState: 'комнаты',
    fourthState: 'комнат',
  },

  'guestsEndings': {
    firstState: 'гостей',
    secondState: 'гостя',
    thirdState: 'гостей',
    fourthState: 'гостей',
  },

  'symbolsEndings': {
    firstState: 'символов',
    secondState: 'символ',
    thirdState: 'символа',
    fourthState: 'символов',
  },
};

export const inclineWord = (num, type) => {
  const n = num ? num.toString() : '1';
  const last = n.slice(-1);
  const twoLast = n.slice(-2);
  if (twoLast === '11' || twoLast === '12' || twoLast === '13' || twoLast === '14') {
    return `${n} ${wordEndings[type].firstState}`;
  }

  if (last === '1') {
    return `${n} ${wordEndings[type].secondState}`;
  }

  if (last === '2' || last === '3' || last === '4') {
    return `${n} ${wordEndings[type].thirdState}`;
  }

  return `${n} ${wordEndings[type].fourthState}`;
};
