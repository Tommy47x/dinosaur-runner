let gameStarted = false; // Flag for starting the game
const dinosaur = document.querySelector('.dinosaur');
let dinosaurPositionY = 0; // Vertical axys of dinosaur
const jumpHeight = 150; // Jump speed (Pixels)
let isJumping = false; // Flag that checks if dinosaur is in the air
const obstacle = document.querySelector('.obstacle');
let obstaclePositionX = 0;
let score = 0;

//Function that starts the game on space-press
function startGameOnSpacePress() {
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && !gameStarted) {
      startGame();
    }
  });
}

// We call the function and wait for 'SPACE' to be pressed
startGameOnSpacePress();

// Function that starts the game
function startGame() {
  obstacleRun(); // Appeal the method on-start that makes obstacles move
  if (gameStarted) return; // If the game started, do nothing
  gameStarted = true;
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && !isJumping && !gameEnded) { // Space for jump
      jumpDinosaur();
      ++score; // And also real-time score in-page
      document.getElementById("score").innerHTML = `${score}`;
    }
  });

}

//Function that makes the dinosaur jump
function jumpDinosaur() {
  if (gameEnded) return;
  isJumping = true; // Dinosaur in-air
  const jumpInterval = setInterval(() => {
    if (dinosaurPositionY >= jumpHeight) {
      clearInterval(jumpInterval);
      fallDinosaur();
    } else {
      dinosaurPositionY += 10; //Vertical axys position
      dinosaur.style.bottom = dinosaurPositionY + 'px';
    }
  }, 20);
}

// Falling animation after jump
function fallDinosaur() {
  const fallInterval = setInterval(() => {
    if (dinosaurPositionY <= 0) {
      clearInterval(fallInterval);
      isJumping = false;
      dinosaurPositionY = 0; //Reset vertical pos
      dinosaur.style.bottom = '0'; //Dinosaur resets to original pos
    } else {
      dinosaurPositionY -= 10; // Vertical pos while falling
      dinosaur.style.bottom = dinosaurPositionY + 'px';
    }
  }, 20);
}

let gameEnded = false;
// Function that moves the obstacles
function obstacleRun() {
  if (gameEnded) return;
  const obstacleWidth = 20; // Obstacle width
  if (obstaclePositionX <= -obstacleWidth) {
    obstaclePositionX = document.querySelector('.game-container.mt-1').clientWidth; //Reposition the obstacle in the right of the screen
  } else {
    obstaclePositionX -= 5; //Move obstacle to left
    obstacle.style.left = obstaclePositionX + 'px';
  }
  requestAnimationFrame(obstacleRun); // Animation continues
}

setInterval(checkCollision, 100); // Interval that checks the collisions

function isCollision(rect1, rect2) { //Algorithm for checkCollision function
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}


// Function that verifies collision
function checkCollision() {
  const obstacleRect = obstacle.getBoundingClientRect();
  const dinosaurRect = dinosaur.getBoundingClientRect();

  if (isCollision(obstacleRect, dinosaurRect)) {
    endGame(); // Collision = end
  }
}

// Function that stops the game
function endGame() {
  gameEnded = true;
  gameStarted = false; //Stopping the game
  clearInterval(jumpDinosaur);
  clearInterval(fallDinosaur);
}
