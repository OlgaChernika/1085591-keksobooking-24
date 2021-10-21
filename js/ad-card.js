const getPriceText = (price) => `${price} ₽/ночь`;

const getCapacityText = (guests, rooms) => {
  let roomsForm = 'комната';
  let guestsForm = 'гостя';
  if(1 < rooms < 5) {
    roomsForm = 'комнаты';
  }

  if(rooms > 4) {
    roomsForm = 'комнат';
  }

  if(guests > 1) {
    guestsForm = 'гостей';
  }
  return `${rooms} ${roomsForm} для ${guests} ${guestsForm}`;
};

const getCheckTimeText = (checkin, checkout) => `Заезд после ${checkin}, выезд до ${checkout}`;

// const filterFeatures = (container, featuresArray) => {
//   //const featuresList = container.children;

//   if(featuresArray.length === 0) {
//     container.remove();
//     return;
//   }

//   featuresList.forEach((feature) => {
//     const findFeature = featuresArray.some(
//       (element) => feature.classList.contains(`popup__feature--${element}`),
//     );

//     if(!findFeature) {
//       feature.remove();
//     }
//   });
// };

const getPhotosList = (container, photosPathArray) => {
  const photosContainer = container.querySelector('.popup__photos');
  const photoItem = photosContainer.querySelector('.popup__photo');

  photosPathArray.forEach((path) => {
    photoItem.src = path;
    photosContainer.appendChild(photoItem);
  });
};

const getAvatarImage = (container, avatarPath) => {
  const avatar = container.querySelector('.popup__avatar');
  avatar.src = avatarPath;
  return avatar;
};

const createCard = (ad) => {

  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.querySelector('.popup');
  const newCard = card.cloneNode(true);
  const {author, offer} = ad;
  const title = newCard.querySelector('.popup__title');
  const address = newCard.querySelector('.popup__text--address');
  const price = newCard.querySelector('.popup__text--price');
  const type = newCard.querySelector('.popup__type');
  const capacity = newCard.querySelector('.popup__text--capacity');
  const checkTime = newCard.querySelector('.popup__text--time');
  //const features = newCard.querySelector('.popup__features');
  // const featuresItems = features.children;
  // const featuresArray = offer.features;
  const description = newCard.querySelector('.popup__description');

  getAvatarImage(newCard, author.avatar);
  title.textContent = offer.title;
  address.textContent = offer.address;
  price.textContent = getPriceText(offer.price);
  type.textContent = offer.type;
  capacity.textContent = getCapacityText(offer.guests, offer.rooms);
  checkTime.textContent = getCheckTimeText(offer.checkin, offer.checkout);
  description.textContent = offer.description;

  getPhotosList(newCard, offer.photos);

  return newCard;
};

export {createCard};
