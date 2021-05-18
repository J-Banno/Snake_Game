/** Variables **/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/** Interface **/

//Fond
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
//Contour
ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, canvas.width, canvas.height);

/** Structure serpent **/

//Initialisation du corp

let snake = [
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

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
displaySnake();
