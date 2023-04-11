import { isEscapeKey} from './util.js';
const COMMENTS_BATCH = 5;

const cancelButton = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.social__comments-loader');
const body = document.querySelector('body');

let commentsShown = 0;
let comments = [];

const renderBigPicture = ({url, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};
const createComment = ({avatar, name, message}) => {
  const comment = commentItem.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_BATCH;
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentCount.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
    commentCount.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }
  commentList.innerHTML = '';
  commentList.append(fragment);
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};
const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  renderBigPicture(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}
const onCancelButtonClick = () => closeBigPicture();
cancelButton.addEventListener('click', onCancelButtonClick);
const onCommentsLoaderClick = () => renderComments();
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export {openBigPicture};
