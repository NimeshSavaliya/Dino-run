const grid = document.querySelector('.grid');
const dino = document.querySelector('.dino');
const body = document.querySelector('body');

let isJumping = false;
const gravity = 0.95;
let isGameOver = false;

const control = (e) => {
  if (e.keyCode === 32 || e.keyCode === 38) {
    if (!isJumping) {
      isJumping = true;
      jump();
    }
  }
};

// Document eventlistener

document.addEventListener('keyup', control);

let position = 0;

const jump = () => {
  let count = 0;

  //Jump up
  let upTimer = setInterval(() => {
    position += 20;
    count++;
    position = position * gravity;
    dino.style.bottom = position + 'px';
    if (count === 15) {
      clearInterval(upTimer);
    }
  }, 20);

  // Down
  let downTimer = setInterval(() => {
    position -= 5;

    dino.style.bottom = position + 'px';
    if (position <= 0) {
      dino.style.bottom = '0px';
      isJumping = false;
      clearInterval(downTimer);
    }
  }, 20);
};

//obstacle generation

const generateObstacle = () => {
  let randomTime = Math.random() * 4000;

  let obstaclePosition = 0;
  const obstacle = document.createElement('div');
  {
    !isGameOver && obstacle.classList.add('obstacle');
  }

  grid.appendChild(obstacle);
  obstacle.style.right = obstaclePosition + 'px';

  let timer = setInterval(() => {
    if (position < 50 && obstaclePosition < 800 && obstaclePosition > 750) {
      clearInterval(timer);
      isGameOver = true;

      //   body.removeChild(body.firstChild);
      while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
      }

      grid.innerHTML = 'GAME OVER';
    }

    obstaclePosition += 7;
    obstacle.style.right = obstaclePosition + 'px';
  }, 20);

  if (!isGameOver) {
    setTimeout(generateObstacle, randomTime);
  }
};
generateObstacle();
