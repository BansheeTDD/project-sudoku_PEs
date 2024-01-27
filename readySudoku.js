//* Данный файл был создан для того чтобы проверить отработку всех функций в отдельном файле.
//! Но проблема была устранена и данный файл стал не нужным.

let boardString = '1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--';
let board = '';

console.log(`Решаем судоку ${boardString}:`);

function solve(boardString) {
  const taskArr = boardString.split('');
  const sudokuArr = [];

  // резделение массива судоку (taskArr) на массивы строчек
  for (let i = 0; i < 9; i += 1) {
    sudokuArr.push(taskArr.splice(0, 9));
  }

  // функция проверки
  function isValidMove(row, col, num) {
    // Проверка строки
    if (sudokuArr[row].includes(num)) return false;

    // Проверка колонки
    if (sudokuArr.some(rowArr => rowArr[col] === num)) return false;

    // Проверка квадрата 3x3
    const squareRow = Math.floor(row / 3) * 3;
    const squareCol = Math.floor(col / 3) * 3;

    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 3; c += 1) {
        if (sudokuArr[squareRow + r][squareCol + c] === num) return false;
      }
    }
    return true;
  }

  // Рекурсивная функция решения судоку
  function solveSudoku() {
    for (let row = 0; row < 9; row += 1) {
      for (let col = 0; col < 9; col += 1) {
        if (sudokuArr[row][col] === '-') {
          for (let num = 1; num <= 9; num += 1) {
            const numStr = num.toString();
            if (isValidMove(row, col, numStr)) {
              sudokuArr[row][col] = numStr;
              if (solveSudoku()) {
                return true;
              }
              sudokuArr[row][col] = '-';
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solveSudoku();
  board = getStringFromArr(sudokuArr);
  return board;
}
solve(boardString);

//? проверка функции solve(boardString)
// console.log(solve(boardString));

//! функция преобразования массива строчек судоку (arrStr) в строчку
function getStringFromArr(arrStr) {
  const string = [];
  for (let i = 0; i < arrStr.length; i++) {
    string.push(arrStr[i].join(''));
  }
  return string.join('');
}

/**
* Принимает игровое поле в том формате, в котором его вернули из функции solve.
* Возвращает булевое значение — решено это игровое поле или нет.
*/
function isSolved(board) {
  const arrStr = getArrString(board);
  const arrCol = getArrColumn(arrStr);
  const arrCoub = getArrCoubs(arrStr);

  const regex = /\d{81}/;
  // Заменить boardString на переменную решения
  if (!regex.test(board)) {
    return false;
  } else {
    const check = ['1', '2', '3', '4', '5', '6', '7', '8', '9',];
    const checkStr = structuredClone(arrStr);
    const checkCol = structuredClone(arrCol);
    const checkCoub = structuredClone(arrCoub);

    const sortedCheckStr = checkStr.map((e) => e.sort( function (a, b) {
      return a-b;
    }));

    const sortedCheckCol = checkCol.map((e) => e.sort( function (a, b) {
      return a-b
    }));

    const sortedCheckCoub = checkCoub.map((e) => e.sort( function (a, b) {
      return a-b;
    }));

    if (sortedCheckStr.filter((e) => e.toString() === check.toString()).length == 9) return true
    else if (sortedCheckCol.filter((e) => e.toString() === check.toString()).length == 9) return true
    else if (sortedCheckCoub.filter((e) => e.toString() === check.toString()).length == 9) return true
    else return false;
  }
}
isSolved(board);

//? Проверка функции isSolved(board)
console.log(isSolved(board));

//! функция преобразования boardString в массив строчек судоку (arrStr)
function getArrString(board) {
  const strArr = [];
  let n = 0;
  for (let i = 0; i < 9; i++) {
    strArr.push(board.trim().slice(n, n + 9).split(''));
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
* Возвращает строку с игровым полем для последующего вывода в консоль.
* Подумай, как симпатичнее сформировать эту строку.
*/
function prettyBoard(board) {
  const arr = board.split(''); //изменить переменную строки
  const newArr = arr.map((e) => e += ' ');
  for (let i = 8; i< newArr.length; i+=9) {
    newArr[i] += '\n';
  }
  const fullBoard = newArr.join('');
  return fullBoard;
}


//? Проверка функции prettyBoard(board)
console.log(prettyBoard(board));
  
// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
// module.exports = {
//     solve,
//     isSolved,
//     prettyBoard,
// };
