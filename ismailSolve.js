/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
function solve(boardString) {
  const taskArr = boardString.split("");
  const sudokuArr = [];

  for (let i = 0; i < 9; i += 1) {
    sudokuArr.push(taskArr.splice(0, 9));
  }

  function isValidMove(row, col, num) {
    // Проверка строки
    if (sudokuArr[row].includes(num)) return false;

    // Проверка колонки
    if (sudokuArr.some((rowArr) => rowArr[col] === num)) return false;

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

  function solveSudoku() {
    for (let row = 0; row < 9; row += 1) {
      for (let col = 0; col < 9; col += 1) {
        if (sudokuArr[row][col] === "-") {
          for (let num = 1; num <= 9; num += 1) {
            const numStr = num.toString();
            if (isValidMove(row, col, numStr)) {
              sudokuArr[row][col] = numStr;

              if (solveSudoku()) {
                return true;
              }

              sudokuArr[row][col] = "-";
            }
          }

          return false;
        }
      }
    }

    return true;
  }

  solveSudoku();

  return sudokuArr;
}

console.log(
  solve(
    "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--"
  )
);
