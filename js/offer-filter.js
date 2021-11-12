const PRICE_RANGE = {
  low: 10000,
  middle: 50000,
};

const typeFilterSelect = document.querySelector('#housing-type');
const priceFilterSelect = document.querySelector('#housing-price');
const roomsFilterSelect = document.querySelector('#housing-rooms');
const guestsFilterSelect = document.querySelector('#housing-guests');

const filterByType = ({type}) => typeFilterSelect.value === type || typeFilterSelect.value === 'any';

const filterByRooms = ({rooms}) => +roomsFilterSelect.value === rooms || roomsFilterSelect.value === 'any';

const filterByGuests = ({guests}) => +guestsFilterSelect.value === guests || guestsFilterSelect.value === 'any';

const filterByPrice = ({price}) => {
  switch (priceFilterSelect.value) {
    case 'low':
      return price <= PRICE_RANGE.low;

    case 'middle':
      return price > PRICE_RANGE.low && price <= PRICE_RANGE.middle;

    case 'high':
      return price > PRICE_RANGE.middle;

    default:
      return true;
  }
};

const filterByFeatures = ({features}) => {
  const currentFeatures = document.querySelectorAll('.map__checkbox:checked');

  if (features) {
    return Array.from(currentFeatures).every((item) => features.includes(item.value));
  }
  return false;
};

export const setDataRanking = (data) =>
  data
    .reduce((rankedData, item) => {
      const rank = item.offer.features && item.offer.features.length ? item.offer.features.length : 0;
      item.offer.rank = rank;
      rankedData.push(item);
      return rankedData;
    }, [])
    .sort((a, b) => b.offer.rank - a.offer.rank);


export const filterData = ({offer}) =>
  filterByType(offer) &&
  filterByPrice(offer) &&
  filterByRooms(offer) &&
  filterByGuests(offer) &&
  filterByFeatures(offer);

