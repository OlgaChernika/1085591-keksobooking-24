const getRandomInt = (min, max, length = 0) => {
  if (min >= max || min < 0 || max <= 0) {
    return false;
  }
  return (Math.random() * (max - min) + min).toFixed(length);
};

const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

const getRandomElement = (array) => {
  const elementIndex = getRandomInt(0, array.length - 1);
  const randomElement = array[elementIndex];

  array.slice(elementIndex, 1);
  return randomElement;
};

const createRandomArray = (array) => {
  const randomArray = [];
  const copiedArray = array.slice();
  const arrayLength = getRandomInt(1, array.length);

  for (let i = 0; i < arrayLength; i++) {
    const arrayElement = getRandomElement(copiedArray);
    randomArray.push(arrayElement);
  }

  return Array.from(new Set(randomArray));
};

const createTextContent = (container, text) => {
  if (text) {
    container.textContent = text;
  }

  container.remove();
};

const getElementChild = (container, selector) => {
  container.querySelector(selector);
};


export {
  getRandomInt,
  shuffle,
  getRandomElement,
  createRandomArray,
  createTextContent,
  getElementChild
};
