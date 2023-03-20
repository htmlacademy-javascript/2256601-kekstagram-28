import {getRandomInteger, createRandomIdFromRangeGenerator, createIdGenerator, getRandomArrayElement} from './util.js';
const TEXT_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const TEXT_DESCRIPTIONS = [
  'И так всегда)))',
  'Зацените лайфхак',
  'Пушка',
  'Мечтать не вредно',
  'Вызываю весну',
  'Закат у океана',
  'Ждём стрим'
];
const USER_NAMES = [
  'Николай',
  'Елена',
  'Василий',
  'Ольга',
  'Валерий',
  'Дмитрий',
  'Евгения',
  'Александ',
];
const DESCRIPTION_PHOTO_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 25;
const COMMENT_TEXT_COUNT = 2;

const generatePhotoId = createRandomIdFromRangeGenerator(1, DESCRIPTION_PHOTO_COUNT);
const generateUrlNumber = createRandomIdFromRangeGenerator(1, DESCRIPTION_PHOTO_COUNT);
const generateUserId = createIdGenerator();
const createCommentText = () =>
  Array.from({length: getRandomInteger(1,COMMENT_TEXT_COUNT)}, () =>
    getRandomArrayElement(TEXT_COMMENTS))
    .join(' ');
const getRandomComment = () =>
  ({
    id: generateUserId(),
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message: createCommentText(),
    name: getRandomArrayElement(USER_NAMES),
  });

const createDescriptionPhoto = () =>
  ({
    id: generatePhotoId(),
    url: `photos/${generateUrlNumber()}.jpg`,
    description: getRandomArrayElement(TEXT_DESCRIPTIONS),
    likes: getRandomInteger(LIKE_MIN_COUNT,LIKE_MAX_COUNT),
    comments: Array.from({length: getRandomInteger(1, COMMENT_COUNT)}, getRandomComment),
  });


const getDescriptionPhotos = () =>
  Array.from({length:DESCRIPTION_PHOTO_COUNT}, () =>
    createDescriptionPhoto()
  );
export {getDescriptionPhotos};
