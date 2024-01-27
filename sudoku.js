/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
function solve(boardString) {
  const arrStr = getArrString(boardString);
  const arrCol = getArrColumn(arrStr);
  const arrCoub = getArrCoubs(arrStr);

  // console.log({ arrStr, arrCol, arrCoub });
  console.log(arrCoub);

}

//! функция преобразования boardString в массив строчек судоку (arrStr)
function getArrString(boardString) {
  const strArr = [];
  let n = 0;
  for (let i = 0; i < 9; i++) {
    strArr.push(boardString.trim().slice(n, n + 9).split(''));
    n += 9;
  }
  return strArr;
}

//! функция преобразования массива строчек судоку (arrStr) в массив колонок судоку (arrCol)
function getArrColumn(arrStr) {
  const columnArr = [];
  for (let i = 0; i < 9; i++) {
    let arrColNaN = [];
    for (let j = 0; j < 9; j++) {
      arrColNaN.push(arrStr[j][i]);
    }
    columnArr.push(arrColNaN);
    arrColNaN = [];
  }
  return columnArr;
}

//! функция преобразования массива строчек судоку (arrStr) в массив квадратов судоку (arrCoub)
function getArrCoubs(arrStr) {
  const squaresArr = [];
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      let square = [];
      for (let r = i; r < i + 3; r += 1) {
        for (let c = j; c < j + 3; c += 1) {
          square.push(arrStr[r][c]);
        }
      }
      squaresArr.push(square);
    }
  }
  return squaresArr;
}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(board) {

}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(board) {
  const arr = string.split(''); //изменить переменную строки
  const newArr = arr.map((e) => e += ' ')
  for (let i = 8; i< newArr.length; i+=9) {
      newArr[i] += '\n'
  }
  const fullBoard = newArr.join('')
  return fullBoard
}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
