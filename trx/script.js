const gridDisplay = document.querySelector(".grid");
const dino = document.querySelector(".dino");
const alert = document.querySelector("#alert");

let isJumping = false;
let gravity = 0.9;
let isGameOver = false;

function control(e) {
  if (e.keyCode === 32) {
    console.log("pressed");
    if (isJumping === false) {
      isJumping = true;

      jump();
    }
  }
}

document.addEventListener("keydown", control);
let position = 0;
function jump() {
  let count = 0;
  const timerId = setInterval(function () {
    //move down
    if (count === 15) {
      clearInterval(timerId);
      let downTimerId = setInterval(function () {
        if (count === 0) {
          clearInterval(downTimerId);
          isJumping = false;
        }
        position = position - 5;
        count--;
        position = position * gravity;
        dino.style.bottom = position + "px";
        console.log("down");
      }, 20);
    }
    //move up
    console.log("up");
    count++;
    position = position + 30;
    position = position * gravity;
    dino.style.bottom = position + "px";
  }, 20);
}

function generateObstacles() {
  let randomTime = Math.random() * 4000;
  console.log(randomTime);
  let obstaclePosition = 1000;
  const obstacle = document.createElement("div");
  if (!isGameOver) obstacle.classList.add("obstacle");
  gridDisplay.appendChild(obstacle);
  obstacle.style.left = obstaclePosition + "px";

  let timerId = setInterval(function () {
    if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
      clearInterval(timerId);
      alert.innerHTML = "Game Over";
      isGameOver = true;
    }
    obstaclePosition -= 10;
    obstacle.style.left = obstaclePosition + "px";
  }, 20);
  if (!isGameOver) {
    setTimeout(generateObstacles, randomTime);
  }
}

generateObstacles();
