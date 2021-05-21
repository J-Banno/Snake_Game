const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/***** Variables *****/

//Serpent
let snake = [
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];
//vitesse sur x
speedX = 10;
//vitesse sur y
speedY = 0;
//Pomme de X
let appleX = 0;
//Pomme de Y
let appleY = 0;
//Score
let score = 0;
//Bug direction
let bugDirection = false;

/***** Fonctions *****/

function animation() {
  setTimeout(function () {
    bugDirection = false;
    cleanCanvas();
    displayApple();
    moveSnake();
    if (gameOver()) {
      return;
    }
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

  const snakeEatApple = snake[0].x === appleX && snake[0].y === appleY;

  if (snakeEatApple) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    createApple();
  } else {
    //On supprime à la fin
    snake.pop();
  }
}

function changeDirection(event) {
  //Gestion bug
  if (bugDirection) return;
  bugDirection = true;

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

function random() {
  return Math.round((Math.random() * 290) / 10) * 10;
}
function createApple() {
  appleX = random();
  appleY = random();

  //Controle que la pomme n'apparait pas sur le serpent
  snake.forEach(function (part) {
    const appleOnSnake = part.x == appleX && part.y == appleY;
    if (appleOnSnake) {
      createApple();
    }
  });
}

function displayApple() {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "darkred";
  ctx.beginPath();
  ctx.arc(appleX + 5, appleY + 5, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

function gameOver() {
  let snakeHead = snake.slice(1, -1);
  let touchBody = false;
  snakeHead.forEach((cube) => {
    if (cube.x === snake[0].x && cube.y === snake[0].y) {
      touchBody = true;
    }
  });
  const touchWallLeft = snake[0].x < -1;
  const touchWallRight = snake[0].x > canvas.width - 10;
  const touchWallTop = snake[0].y < -1;
  const touchWallBottom = snake[0].y > canvas.height - 10;

  let over = false;

  if (
    touchBody ||
    touchWallBottom ||
    touchWallLeft ||
    touchWallTop ||
    touchWallRight
  ) {
    over = true;
  }
  return touchBody;
}
//Événement flêches clavier
document.addEventListener("keydown", changeDirection);

animation();
createApple();
changeDirection();
displaySnake();
