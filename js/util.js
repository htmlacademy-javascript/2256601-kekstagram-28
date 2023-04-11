const ALERT_SHOW_TIME = 5000;
const TIMEOUT = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showMessage = (id) => {
  const template = document.querySelector(`#${id}`)
    .content
    .querySelector(`.${id}`);
  const element = template.cloneNode(true);
  document.body.append(element);
  const button = element.querySelector(`.${id}__button`);
  const closeMessage = () => {
    element.remove();
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
    if (evt.target === element) {
      closeMessage();
    }
  }
  button.addEventListener('click', () => {
    closeMessage();
  });
  document.addEventListener('keydown', onMessageEscape);
  document.addEventListener('click', onOutsideElement);
};

const debounce = (cb, timeoutDelay = TIMEOUT) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, showAlert, showMessage, debounce};

