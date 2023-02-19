const { get } = require("browser-sync");

//Функция для проверки длины строки.
function checkLengthString (string, number) {
  return string.length <= number;
}
checkLengthString();
//Функция для проверки, является ли строка палидромом.
function isPalidrome (string) {
  const modifiedString = string.toUpperCase().replaceAll(' ','');
  for (let i = 0;i < modifiedString.length;i++) {
    return modifiedString[i] === modifiedString[modifiedString.length - 1 - i];
  }
}
isPalidrome();
//Функция, которая извлекает цифры
function getNumbers (string) {
  const modifiedString = String(string).replaceAll(' ','');
  let result = '';
  for (let i = 0;i < modifiedString.length; i++) {
    if (!isNaN(Number(modifiedString[i]))) {
      result += modifiedString[i];
    }
  } return parseInt(result,10);
}
getNumbers();

function addSimbolsToLength (string, targetLength, extraString) {
  const missing = targetLength - string.length;
  const remain = missing % extraString.length;
  let extra = '';
  for (let i = 1; i < (missing / extraString.length); i++) {
    extra += extraString;
  }
  const result = extraString.at(remain - 1) + extra + string;
  return result;
}
addSimbolsToLength ('q',4,'we');

