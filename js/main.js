function getRandomInt(min, max) {
  min = Math.abs(Math.ceil(min));
  max = Math.abs(Math.floor(max));
  if(min>=max) {
    return 'Введите корректный диапозон положительных чисел, начиная с наименьшего числа.';
  }
  return Math.floor(Math.random()*(max - min + 1)) + min;
}

getRandomInt(0, 11);

function getRandomFloatInt(min, max, lenght) {
  min = Math.abs(+min.toFixed(1));
  max = Math.abs(+max.toFixed(1));
  if(min>=max) {
    return 'Введите корректный диапозон положительных чисел, начиная с наименьшего числа.';
  }
  const int = Math.random()*(max - min) + min;
  return +int.toFixed(lenght);
}

getRandomFloatInt(1.6, 3.555, 2);
