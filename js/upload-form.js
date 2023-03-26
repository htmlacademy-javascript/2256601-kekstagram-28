import { isEscapeKey} from './util.js';
import { resetScale } from './scale.js';

const TAG_ERROR_MESSAGE = 'Неверно заполнены хэштеги';
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

const uploadForm = document.querySelector('.img-upload__form');
const ImgOverlayForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadImgInput = document.querySelector('.img-upload__input');
const cancelButton = document.querySelector('.img-upload__cancel');
const hashtegInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper',
});
const openImg = () => {
  ImgOverlayForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};
const closeImg = () => {
  uploadForm.reset();
  resetScale();
  pristine.reset();
  ImgOverlayForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImg();
  }
}
const isValidTag = (tag) => VALID_SYMBOLS.test(tag);
const validCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;
const uniqueHashtags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};
const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return validCount(tags) && uniqueHashtags (tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtegInput,
  validateTags,
  TAG_ERROR_MESSAGE
);

const onTextFieldKeydown = (field) => {
  field.addEventListener('focus', () => {
    document.removeEventListener('keydown', onDocumentKeydown);
  });
  field.addEventListener('blur', () => {
    document.addEventListener('keydown', onDocumentKeydown);
  });
};
onTextFieldKeydown(commentInput);
onTextFieldKeydown(hashtegInput);

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};
const onUploadFileInputChange = () => openImg();
uploadImgInput.addEventListener('change', onUploadFileInputChange);
const onCancelButtonClick = () => closeImg ();
cancelButton.addEventListener('click', onCancelButtonClick);
uploadForm.addEventListener('submit', onUploadFormSubmit);
