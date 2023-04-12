import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';


const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуется...'
};

const uploadForm = document.querySelector('.img-upload__form');
const imgOverlayForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadImgInput = document.querySelector('.img-upload__input[type=file]');
const uploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');
const cancelButton = document.querySelector('.img-upload__cancel');
const hashtegInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper_error-text',
}, false);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const uploadPhoto = () => {
  const file = uploadImgInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((effect) => {
      effect.getElementsByClassName.backgroundImage = `url(${uploadPreview.src})`;
    });
  }
};
const openImg = () => {
  imgOverlayForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadPhoto();
};
const closeImg = () => {
  uploadForm.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  imgOverlayForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};
const isUploadMessage = () => document.querySelector('.success') || document.querySelector('.error');
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && isUploadMessage() === null) {
    evt.preventDefault();
    closeImg();
  }
}
const closeMessage = () => {
  isUploadMessage().remove();
  document.removeEventListener('keydown', onMessageEscape);
  document.removeEventListener('click', onOutsideElement);
};
function onMessageEscape (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}
function onOutsideElement (evt) {
  if (evt.target === isUploadMessage()) {
    closeMessage();
  }
}
const showMessage = (id) => {
  const template = document.querySelector(`#${id}`)
    .content
    .querySelector(`.${id}`);
  const element = template.cloneNode(true);
  document.body.append(element);
  const button = element.querySelector(`.${id}__button`);
  button.addEventListener('click', () => {
    closeMessage();
  });
  document.addEventListener('keydown', onMessageEscape);
  document.addEventListener('click', onOutsideElement);
};

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
const getErrorMessage = (value) => {
  let errorMessage = '';
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  if (!validCount(tags)) {
    errorMessage = 'Максимальное количество хэштегов не больше 5';
  } else if (!uniqueHashtags (tags)) {
    errorMessage = 'Нельзя указывать одинаковые хэштеги';
  } else if (!tags.every(isValidTag)) {
    errorMessage = 'Введите валидное значение хэштега';
  }
  return errorMessage;
};

pristine.addValidator(
  hashtegInput,
  validateTags,
  getErrorMessage,
);

const onTextFieldKeydown = (field) => {
  field.addEventListener('focus', () => {
    document.removeEventListener('keydown', onDocumentKeydown);
    pristine.reset();
  });
  field.addEventListener('blur', () => {
    document.addEventListener('keydown', onDocumentKeydown);
  });
};
onTextFieldKeydown(commentInput);
onTextFieldKeydown(hashtegInput);

const onUploadFileInputChange = () => openImg();
uploadImgInput.addEventListener('change', onUploadFileInputChange);
const onCancelButtonClick = () => closeImg ();
cancelButton.addEventListener('click', onCancelButtonClick);

const setUloadFromSubmit = (cb) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(uploadForm));
      unblockSubmitButton();
    }
  });
};

export {setUloadFromSubmit, closeImg, showMessage};
