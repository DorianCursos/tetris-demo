// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const BLOCK_SIZE = 25;
const BOARD_WIDTH = 14;
const BOARD_HEIGHT = 30;

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

const BOARD = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
];

const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1]
  ]
};

context.scale(BLOCK_SIZE, BLOCK_SIZE);

let lastRenderTime = 0;
let areCollision = false;

const draw = () => {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  BOARD.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = 'orange';
        context.fillRect(x, y, 1, 1);
      }
    });
  });

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = 'red';
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
      }
    });
  });
};

const update = currentTime => {
  const deltaTime = currentTime - lastRenderTime;

  if (deltaTime > 1000 / 60) {
    draw();
    lastRenderTime = currentTime;
  }

  window.requestAnimationFrame(update);
};

const startGame = () => {
  lastRenderTime = performance.now();
  update();
};

const checkCollision = () => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] === 1) {
        const absoluteX = piece.position.x + x;
        const absoluteY = piece.position.y + y;

        // Comprueba si el bloque está fuera de los límites del tablero
        if (
          absoluteX < 0 || // Colisión con el borde izquierdo
          absoluteX >= BOARD_WIDTH || // Colisión con el borde derecho
          absoluteY >= BOARD_HEIGHT || // Colisión con la parte inferior del tablero
          (absoluteY >= 0 && BOARD[absoluteY][absoluteX] === 1) // Colisión con otra pieza
        ) {
          return true; // Hay colisión
        }
      }
    }
  }

  return false; // No hay colisión
};

const joinPieceOnBoard = () => {
  piece.shape.forEach((row, x) => {
    row.forEach((value, y) => {
      if (value === 1) {
        BOARD[y + piece.position.y][x + piece.position.x] = 1;
      }
    });
  });
  piece.position.x = 0;
  piece.position.y = 0;
};

startGame();

window.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    piece.position.x--; // Movimiento a la izquierda
    if (checkCollision()) piece.position.x++; // Si hay colisión, deshacer el movimiento
  }
  if (event.key === 'ArrowRight') {
    piece.position.x++; // Movimiento a la derecha
    if (checkCollision()) piece.position.x--; // Si hay colisión, deshacer el movimiento
  }
  if (event.key === 'ArrowDown') {
    piece.position.y++; // Movimiento hacia abajo
    if (checkCollision()) {
      piece.position.y--; // Si hay colisión, deshacer el movimiento
      joinPieceOnBoard();
    }
  }
});
