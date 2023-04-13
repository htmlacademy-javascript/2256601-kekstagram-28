import {renderPictures} from './rendering.js';
import {openBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');
let pictures;
const onContainerClick = (evt) => {
  const picture = evt.target.closest('[data-picture-id]');
  if (!picture) {
    return;
  }
  evt.preventDefault();
  const currentPicture = pictures.find(
    (item) => item.id === Number(picture.dataset.pictureId)
  );
  openBigPicture(currentPicture);
};

const renderGallery = (currentpictures) => {
  pictures = currentpictures;
  renderPictures(pictures, container);
  container.addEventListener('click', onContainerClick);
};

export {renderGallery};
