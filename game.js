// game.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let stickman = {
  x: 50,
  y: 300,
  width: 20,
  height: 50,
  velocityY: 0,
  isJumping: false
};

let hills = [
  { x: 200, y: 350, width: 100, height: 50 },
  { x: 400, y: 350, width: 100, height: 50 },
  { x: 600, y: 350, width: 100, height: 50 }
];

const gravity = 0.8;
const jumpStrength = -15;

function drawStickman() {
  // Kopf
  ctx.beginPath();
  ctx.arc(stickman.x + 10, stickman.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();

  // Körper
  ctx.beginPath();
  ctx.moveTo(stickman.x + 10, stickman.y + 10);
  ctx.lineTo(stickman.x + 10, stickman.y + 40);
  ctx.stroke();

  // Arme
  ctx.beginPath();
  ctx.moveTo(stickman.x + 10, stickman.y + 20);
  ctx.lineTo(stickman.x, stickman.y + 30);
  ctx.moveTo(stickman.x + 10, stickman.y + 20);
  ctx.lineTo(stickman.x + 20, stickman.y + 30);
  ctx.stroke();

  // Beine
  ctx.beginPath();
  ctx.moveTo(stickman.x + 10, stickman.y + 40);
  ctx.lineTo(stickman.x, stickman.y + 50);
  ctx.moveTo(stickman.x + 10, stickman.y + 40);
  ctx.lineTo(stickman.x + 20, stickman.y + 50);
  ctx.stroke();
}

function drawHills() {
  ctx.fillStyle = "gray";
  hills.forEach(hill => {
    ctx.fillRect(hill.x, hill.y, hill.width, hill.height);
  });
}

function updateStickman() {
  if (stickman.y < 300) {
    stickman.velocityY += gravity;
  } else {
    stickman.velocityY = 0;
    stickman.y = 300;
    stickman.isJumping = false;
  }
  stickman.y += stickman.velocityY;
}

function updateHills() {
  hills.forEach(hill => {
    hill.x -= 2;
    if (hill.x + hill.width < 0) {
      hill.x = canvas.width;
    }
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStickman();
  drawHills();

  updateStickman();
  updateHills();

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !stickman.isJumping) {
    stickman.velocityY = jumpStrength;
    stickman.isJumping = true;
  }
});

gameLoop();
