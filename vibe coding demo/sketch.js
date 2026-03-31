let paddleLeft, paddleRight, ball;
let ballSpeedX = 5, ballSpeedY = 3;
let scoreLeft = 0, scoreRight = 0;
let gameState = 'start';
let aiReactionTime = 0.9;
let hueOffset = 0;
let time = 0;
let winner = '';

function setup() {
  createCanvas(800, 400);
  colorMode(HSB, 360, 100, 100);
  paddleLeft = new Paddle(20, height / 2 - 50, 'left');
  paddleRight = new Paddle(width - 30, height / 2 - 50, 'right');
  resetBall();
}

function draw() {
  time += 0.02;
  hueOffset = (time * 60) % 360;
  
  if (gameState === 'start') {
    drawStartScreen(hueOffset);
  } else if (gameState === 'playing') {
    drawGame(hueOffset);
  } else if (gameState === 'gameover') {
    drawGameOverScreen(hueOffset);
  }
}

function drawStartScreen(hue) {
  background(hue, 80, 20);
  
  // Hallucinogenic Title
  let titleHue = (hue + sin(time * 8) * 30 + 180) % 360;
  let titleSize = 48 + sin(time * 6) * 8;
  
  fill(titleHue, 90, 90);
  stroke((titleHue + 60) % 360, 80, 80);
  strokeWeight(4 + sin(time * 4) * 2);
  textAlign(CENTER);
  textSize(titleSize);
  textFont('Arial Black');
  text("HALLUCINOGENIC PONG", width / 2, height / 2 - 60);
  
  // Instructions
  fill(0);
  textSize(20);
  text("W/S = Player (Green)     AI = Opponent (Red)", width / 2, height / 2);
  text("First to 5 wins!", width / 2, height / 2 + 30);
  
  // Pulsing Start prompt
  let promptHue = (hue + 120 + sin(time * 3) * 30) % 360;
  let promptSize = 28 + sin(time * 5) * 4;
  fill(promptHue, 90, 90);
  stroke((promptHue + 150) % 360, 80, 80);
  strokeWeight(3);
  textSize(promptSize);
  text("Press SPACE to Play!", width / 2, height / 2 + 100);
}

function drawGame(hue) {
  background(hue, 80, 20);
  
  stroke(0);
  strokeWeight(4);
  for (let i = 0; i < height; i += 20) {
    line(width / 2, i, width / 2, i + 10);
  }
  
  paddleLeft.update();
  paddleRight.updateAI(ball.y);
  paddleLeft.display(hue);
  paddleRight.display((hue + 180) % 360);
  
  updateBall();
  displayBall((hue + 90) % 360);
  
  fill(0);
  textAlign(CENTER);
  textSize(32);
  text(scoreLeft, width / 4, 50);
  text(scoreRight, 3 * width / 4, 50);
  
  if (scoreLeft >= 5 || scoreRight >= 5) {
    gameState = 'gameover';
    winner = scoreLeft >= 5 ? 'Player Wins!' : 'AI Wins!';
    resetGame();
  }
}

function drawGameOverScreen(hue) {
  background(hue, 80, 20);
  
  // Hallucinogenic winner text
  let winHue = (hue + sin(time * 7) * 40) % 360;
  let winSize = 48 + sin(time * 5) * 10;
  
  fill(winHue, 90, 90);
  stroke((winHue + 60) % 360, 80, 80);
  strokeWeight(5);
  textAlign(CENTER);
  textSize(winSize);
  text(winner, width / 2, height / 2 - 40);
  
  textSize(24);
  fill(0);
  text(`Final Score: ${scoreLeft} - ${scoreRight}`, width / 2, height / 2 + 20);
  
  // Pulsing restart
  let restartHue = (hue + 120 + sin(time * 4) * 30) % 360;
  let restartSize = 28 + sin(time * 6) * 4;
  fill(restartHue, 90, 90);
  stroke((restartHue + 150) % 360, 80, 80);
  strokeWeight(3);
  textSize(restartSize);
  text("Press SPACE to Play Again!", width / 2, height / 2 + 80);
}

function keyPressed() {
  if (key === ' ') {
    if (gameState === 'start' || gameState === 'gameover') {
      startGame();
    }
  }
}

function startGame() {
  gameState = 'playing';
  resetBall();
}

function resetGame() {
  scoreLeft = 0;
  scoreRight = 0;
}

class Paddle {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.w = 15;
    this.h = 80;
    this.side = side;
    this.speed = 6;
  }
  
  update() {
    if (this.side === 'left') {
      if (keyIsDown(87)) {
        this.y = max(0, this.y - this.speed);
      }
      if (keyIsDown(83)) {
        this.y = min(height - this.h, this.y + this.speed);
      }
    }
  }
  
  updateAI(targetY) {
    if (this.side !== 'right') return;
    
    let target = lerp(this.y + this.h/2, targetY, aiReactionTime);
    target = constrain(target, this.h/2, height - this.h/2);
    
    if (this.y + this.h/2 < target) {
      this.y = min(height - this.h, this.y + this.speed);
    } else if (this.y + this.h/2 > target) {
      this.y = max(0, this.y - this.speed);
    }
  }
  
  display(hue) {
    fill((hue + 30) % 360, 90, 90);
    stroke((hue + 60) % 360, 80, 80);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h);
  }
  
  get top() { return this.y; }
  get bottom() { return this.y + this.h; }
  get left() { return this.x; }
  get right() { return this.x + this.w; }
}

function resetBall() {
  ball = {
    x: width / 2,
    y: height / 2,
    size: 12,
    speedX: ballSpeedX * (random() > 0.5 ? 1 : -1),
    speedY: ballSpeedY * (random(-1, 1))
  };
}

function updateBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  
  if (ball.y - ball.size/2 <= 0 || ball.y + ball.size/2 >= height) {
    ball.speedY *= -1;
  }
  
  if (collidesWithPaddle(paddleLeft) || collidesWithPaddle(paddleRight)) {
    ball.speedX *= -1;
    let paddleHit = collidesWithPaddle(paddleLeft) ? paddleLeft : paddleRight;
    let relativeY = (ball.y - paddleHit.y) / paddleHit.h;
    ball.speedY = map(relativeY, 0, 1, -5, 5);
  }
  
  if (ball.x < 0) {
    scoreRight++;
    resetBall();
  } else if (ball.x > width) {
    scoreLeft++;
    resetBall();
  }
}

function collidesWithPaddle(paddle) {
  return ball.x - ball.size/2 < paddle.right &&
         ball.x + ball.size/2 > paddle.left &&
         ball.y + ball.size/2 > paddle.top &&
         ball.y - ball.size/2 < paddle.bottom;
}

function displayBall(hue) {
  fill((hue + 120) % 360, 95, 95);
  stroke((hue + 150) % 360, 85, 85);
  strokeWeight(2);
  ellipse(ball.x, ball.y, ball.size);
}
