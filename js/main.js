const getRandomInt = (min, max, length = 0) => {
  if (min >= max || min < 0 || max <= 0) {
    return false;
  }
  return (Math.random() * (max - min) + min).toFixed(length);
};

getRandomInt (1, 6);
