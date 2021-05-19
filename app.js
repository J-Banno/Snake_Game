const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
/** Variables **/

//Serpent
let snake = [
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];
//vitesse sur x
speedX = 0;
//vitesse sur y
speedY = -10;

/** Fonctions **/

function animation() {
  setTimeout(function () {
    cleanCanvas();
    moveSnake();
    displaySnake();
    //Récursion
    animation();
  }, 100);
}

function cleanCanvas() {
  //Fond
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //Contour
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function displayCube(cube) {
  ctx.fillStyle = "#00fe14";
  ctx.strokeStyle = "black";
  ctx.fillRect(cube.x, cube.y, 10, 10);
  ctx.strokeRect(cube.x, cube.y, 10, 10);
}

function displaySnake() {
  snake.forEach((cube) => {
    displayCube(cube);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + speedX, y: snake[0].y + speedY };
  //On ajoute au début
  snake.unshift(head);
  //On supprime à la fin
  snake.pop();
}

function changeDirection(event) {
  const left = 37;
  const right = 39;
  const up = 38;
  const down = 40;

  const direction = event.keyCode;

  const goUp = speedY === -10;
  const goDown = speedY === 10;
  const goRight = speedX === 10;
  const goLeft = speedX === -10;

  if (direction === left && !goRight) {
    speedX = -10;
    speedY = 0;
  }
  if (direction === right && !goLeft) {
    speedX = 10;
    speedY = 0;
  }
  if (direction === up && !goDown) {
    speedX = 0;
    speedY = -10;
  }
  if (direction === down && !goUp) {
    speedX = 0;
    speedY = 10;
  }
}

//Événement flêches clavier
document.addEventListener("keydown", changeDirection);

animation();
changeDirection();
displaySnake();
