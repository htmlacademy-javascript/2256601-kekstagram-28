const RANDOM_PICTURE_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOME: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOME:
      return pictures.slice().sort(sortRandomly).slice(0, RANDOM_PICTURE_COUNT);
    case Filter.DISCUSSED:
      return pictures.slice().sort(sortByComments);
    default:
      return pictures.slice();
  }
};

const setOnFilterClick = (cb) => {
  filterElement.addEventListener('click', (evt) => {
    if(!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }
    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    cb(getFilteredPictures());
  });
};

const initFilter = (loadedPictures, cb) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = loadedPictures.slice();
  setOnFilterClick(cb);
};

export {getFilteredPictures ,initFilter};
