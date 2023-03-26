import {renderPictures} from './rendering.js';
import {openBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener ('click', (evt) => {
    const picture = evt.target.closest('[data-picture-id');
    if (!picture) {
      return;
    }
    evt.preventDefault();
    const currentPicture = pictures.find(
      (item) => item.id === Number(picture.dataset.pictureId)
    );
    openBigPicture(currentPicture);
  });
  renderPictures(pictures, container);
};

export {renderGallery};
