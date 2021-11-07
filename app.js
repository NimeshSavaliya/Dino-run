const grid = document.querySelector('.grid');
const dino = document.querySelector('.dino');

let isJumping = false;
const gravity = 0.9;

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
    if (count === 25) {
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
