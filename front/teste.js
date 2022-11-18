const equacoes = ['45-5+2', '48-8+2', '80/2+2'];
const number = '';
const state = {
  secret: equacoes[Math.floor(Math.random() * equacoes.length)],
  grid: Array(6)
  .fill()
  .map(() => Array(5).fill('')),
currentRow: 0,
currentCol: 0,
};

function updateGrid(){
  for (let i = 0; i < state.grid.length; i++){
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function drawBox(container, row, col, number = ''){
  const box = document.createElement('div');
  box.className = 'box';
  box.id = `box${row}${col}`;
  box.textContent = number;

  container.appendChild(box);
  return box;
}

function drawGrid(container){
  const grid = document.createElement('div');
  grid.className = 'grid';
  for (let i = 0; i < 5; i++){
    for(let j = 0; j < 6; j++){
      drawBox(grid, i, j);
    }
  }
  container.appendChild(grid);
}

function registerClickEvents(){
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === 'Enter') {
      if (state.currentCol === 6){
        const num = getCurrentNum();
          revealNum(num);
          state.currentRow++;
          console.log(state.currentRow);
          state.currentCol = 0;
      } 
    }
    if (key === 'Backspace'){
      removeNum();
    }
    if (isNum(key)) {
      addNum(key);
    }
    updateGrid();
  }
}
function getCurrentNum() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}
function isValid(num){
  return equacoes.includes(num);
}

function revealNum(guess) {
  const row = state.currentRow //Recebe o valor do BACK
  for (let i = 0; i < 6; i++){
    const box = document.getElementById(`box${row}${i}`);
    const nbr = box.textContent;
    if (nbr === state.secret[i]) {
    box.classList.add('ok');
  }
    else if (state.secret.includes(nbr)) {
      box.classList.add('n-ok');
  }
    else {
      box.classList.add('fail');
    }
  }
  const isWinner = state.secret === guess;
  const isGameOver = state.currentRow === 4;

  if (isWinner) {
    alert('You win! Congratulations!');
  }
  else if (isGameOver) {
    alert('Try again!');
  }
}

function isNum(key) {
  return key.length === 1 && key.match(/['0','1','2','3','4','5','6','7','8','9', '_','*','/','+',]/i);
}

function addNum(num) {
  if (state.currentCol === 6) return;
  state.grid[state.currentRow][state.currentCol] = num;
  state.currentCol++;
}

function removeNum()
 {
  if (state.currentCol === 0) return;
  state.grid[state.currentRow][state.currentCol - 1] = '';
  state.currentCol--;
 }

 function put_value(value) {
  console.log(value);
  number = value;
};

function startup() {
  const game = document.getElementById('game');
  drawGrid(game);
  registerClickEvents();
}

startup();


