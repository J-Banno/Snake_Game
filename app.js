//Variables

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/****Interface****/

//Fond
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
//Contour
ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, canvas.width, canvas.height);
