// Tamanho do tabuleiro
const boardSize = 10;

// Array bidimensional para representar o tabuleiro
let board = [];

// Criar o tabuleiro inicial
for (let i = 0; i < boardSize; i++) {
  board[i] = [];
  for (let j = 0; j < boardSize; j++) {
    board[i][j] = 0;
  }
}

// Função para atualizar o tabuleiro no HTML
function updateBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (board[i][j] === 1) {
        cell.classList.add('alive');
      }

      // Adicionar evento de clique para alterar o estado da célula
      cell.addEventListener('click', function() {
        board[i][j] = board[i][j] === 1 ? 0 : 1;
        updateBoard();
      });

      boardElement.appendChild(cell);
    }
  }
}

// Função para verificar o estado de uma célula e aplicar as regras do jogo
function updateCellState() {
  const newBoard = [];

  for (let i = 0; i < boardSize; i++) {
    newBoard[i] = [];
    for (let j = 0; j < boardSize; j++) {
      const currentState = board[i][j];
      let aliveNeighbors = 0;

      // Contar o número de vizinhos vivos
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x === 0 && y === 0) {
            continue; // Ignorar a célula atual
          }

          const neighborRow = (i + x + boardSize) % boardSize; // Lógica para considerar células nas bordas
          const neighborCol = (j + y + boardSize) % boardSize;

          aliveNeighbors += board[neighborRow][neighborCol];
        }
      }

      // Aplicar as regras do jogo
      if (currentState === 1) {
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
          newBoard[i][j] = 0; // Celula viva morre por solidão ou superpopulação
        } else {
          newBoard[i][j] = 1; // Celula viva continua viva para a próxima geração
        }
      } else {
        if (aliveNeighbors === 3) {
          newBoard[i][j] = 1; // Celula vazia com 3 vizinhos vivos se torna viva
        } else {
          newBoard[i][j] = 0; // Celula vazia continua vazia
        }
      }
    }
  }

  board = newBoard;
  updateBoard();
}

// Chamar a função updateCellState a cada segundo para atualizar o tabuleiro
setInterval(updateCellState, 1000);
