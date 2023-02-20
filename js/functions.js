//Функция для проверки длины строки.
function checkLengthString (string, number) {
  return string.length <= number;
}

//Функция для проверки, является ли строка палидромом.
function isPalidrome (string) {
  const modifiedString = string.toUpperCase().replaceAll(' ','');
  for (let i = 0;i < modifiedString.length;i++) {
    return modifiedString[i] === modifiedString[modifiedString.length - 1 - i];
  }
}

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

//Функция для формирования адресов файлов.
function addSimbolsToLength (string, targetLength, extraString) {
  const extraLength = targetLength - string.length;
  const remains = extraLength % extraString.length;
  let extra = '';
  let result;
  if (string.length < targetLength) {
    for (let i = 1; i <= (extraLength / extraString.length); i++) {
      extra += extraString;
    }
    result = extraString.slice(0,remains) + extra + string;
  } else {
    result = string;
  }
  return result;
}
