const TEXT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const TEXT_DESCRIPTIONS = [
  'Живописный вид',
  'Прекрасный пейзаж',
  'Восхитительный закат',
  'Мечта',
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

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
function createIdGenerator () {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}
const generatePhotoId = createRandomIdFromRangeGenerator(1, DESCRIPTION_PHOTO_COUNT);
const generateUrlNumber = createRandomIdFromRangeGenerator(1, DESCRIPTION_PHOTO_COUNT);
const generateUserId = createIdGenerator();
const getRandomArrayElement = (elements) => elements[getRandomInteger(0,elements.length - 1)];
const getRandomComment = () =>
  ({
    id: generateUserId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(TEXT_MESSAGES),
    name: getRandomArrayElement(USER_NAMES),
  });

const createDescriptionPhoto = () =>
  ({
    id: generatePhotoId(),
    url: `photos/${generateUrlNumber()}.jpg`,
    description: getRandomArrayElement(TEXT_DESCRIPTIONS),
    likes: getRandomInteger(15,200),
    comments: Array.from({length: 2}, getRandomComment),
  });
const similarDescriptionPhoto = Array.from({length: DESCRIPTION_PHOTO_COUNT}, createDescriptionPhoto);
