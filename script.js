function createEmptyGrid() {
  const grid = document.getElementById("grid");

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = i;
      cell.dataset.y = j;
      grid.appendChild(cell);
    }
  }
}

function clearGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
}

createEmptyGrid();

document.getElementById("generate").addEventListener("click", generateAndDisplaySudoku);

function generateAndDisplaySudoku() {
  clearGrid();
  const grid = document.getElementById("grid");
  const sudoku = generateRandomSudoku();

  if (sudoku) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = i;
        cell.dataset.y = j;
        cell.textContent = sudoku[i][j];
        grid.appendChild(cell);
      }
    }
  }
}

function generateRandomSudoku() {
  const sudoku = [];
  for (let i = 0; i < 9; i++) {
    sudoku.push(new Array(9).fill(0));
  }

  if (solveSudoku(sudoku)) {
    return sudoku;
  } else {
    return null;
  }
}

function solveSudoku(sudoku) {
  const emptyCell = findEmptyCell(sudoku);

  if (!emptyCell) {
    return true;
  }

  const [row, col] = emptyCell;
  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (isValidMove(sudoku, row, col, num)) {
      sudoku[row][col] = num;

      if (solveSudoku(sudoku)) {
        return true;
      }

      sudoku[row][col] = 0;
    }
  }

  return false;
}

function findEmptyCell(sudoku) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
}

function isValidMove(sudoku, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (sudoku[row][i] === num || sudoku[i][col] === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (sudoku[i][j] === num) {
        return false;
      }
    }
  }

  return true;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
