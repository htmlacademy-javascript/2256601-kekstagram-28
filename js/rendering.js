const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const createPicture = ({id, url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.pictureId = id;
  return pictureElement;
};
const renderPictures = (pictures, container) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    fragment.append(pictureElement);
  });
  container.append(fragment);
};
export {renderPictures};
