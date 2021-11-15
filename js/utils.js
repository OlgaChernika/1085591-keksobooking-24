export const typeToEndings = {
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
    return `${n} ${typeToEndings[type].firstState}`;
  }

  if (last === '1') {
    return `${n} ${typeToEndings[type].secondState}`;
  }

  if (last === '2' || last === '3' || last === '4') {
    return `${n} ${typeToEndings[type].thirdState}`;
  }

  return `${n} ${typeToEndings[type].fourthState}`;
};

export const renderElement = (container, element) => {
  container.insertAdjacentHTML('beforeend', element);
};

export const isEcsEvt = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
