// Final project, Maxwell the cat clicker game
// Ryder Martin
// 4/29/2026 - 

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//settings var
let bgOneLocked = true;
let bgTwoLocked = true;
let audioOn = true;

//more backgrounds and settings icon
let extraBg;
let extraBg2;
let settingsIcon;

//Cat images
let mexCatImg;
let mexCatGif;
let maxwellImage;
let maxwellGif;

//scott images
let scott;

//store images
let shelf;
let storeCounter;
let lock;

//gamestate 'game' global var
let backGround;
let catHere = true;
let catGif = false;
let catSound;
let count = 0;
let gameState = 'Settings';
let gifTimer = 0;

//gamestate 'store' global var
let twoTimesMulti = false;
let fourTimesMulti = false;
let sixTimesMulti = false;
let eightTimesMulti = false;
let clickValue = 1;
let activeMulti = false;
let isLocked4 = true;
let isLocked6 = true;
let isLocked8 = true;
let isLocked2 = false;


function preload() {
  maxwellImage = loadImage('assets/maxwell1.png');
  maxwellGif = loadImage('assets/maxwell.gif');
  catSound = loadSound('assets/Maxwell_oiia.mp3');
  backGround = loadImage('assets/Lofibackground.png');
  mexCatImg = loadImage('assets/MexMaxImg.png');
  mexCatGif = loadImage('assets/MexMaxGif.gif');
  storeCounter = loadImage('assets/StoreCounter.png');
  shelf = loadImage('assets/shelf.png');
  lock = loadImage('assets/lock.png');
  scott = loadImage('assets/SCOTTY.png');
  extraBg = loadImage('assets/space.jpg');
  settingsIcon = loadImage('assets/settingsGear.png');
  extraBg2 = loadImage('assets/sci-fi.jpg');
}

function setup() {
  createCanvas(600, 800);
  maxwellGif.delay(1);
  mexCatGif.delay(8);
}

function draw() {
  //background and all other functions here

  if (catGif && millis() - gifTimer > 1450) {
    catGif = false;
    catHere = true;
  }

  if (gameState === 'Game') {
    //if the gamestate is set to game, do these: CATSPIN when clicekd on cat, 
    // click on "STORE" button then go to the shop
    image(backGround, 0, 0, 600, 800);
    image(settingsIcon, 0, 750, 50, 50)
    if (catHere) image(maxwellImage, 50, 300);
    if (catGif) image(maxwellGif, 50, 300);
    shopbutton();
    if (mouseX >= 50 && mouseX <= 210 && mouseY >= 300 && mouseY <= 420) {
      cursor(HAND);
    }
    else if (mouseX >= 500 && mouseX <= 600 && mouseY >= 750 && mouseY <= 800) {
      cursor(HAND);
    }
    else if (mouseX >= 0 && mouseX <= 50 && mouseY >= 750 && mouseY <= 800) {
      cursor(HAND);
    }
    else cursor(ARROW);

    helpWords();
  }


  //gamestate space
  else if (gameState === 'space') {
    //if the gamestate is set to space background, do these: CATSPIN when clicked on cat, 
    image(extraBg, 0, 0, 600, 800);
    image(settingsIcon, 0, 750, 50, 50)
    if (catHere) image(maxwellImage, 50, 300);
    if (catGif) image(maxwellGif, 50, 300);
    shopbutton();
    if (mouseX >= 50 && mouseX <= 210 && mouseY >= 300 && mouseY <= 420) {
      cursor(HAND);
    }
    else if (mouseX >= 500 && mouseX <= 600 && mouseY >= 750 && mouseY <= 800) {
      cursor(HAND);
    }
    else if (mouseX >= 0 && mouseX <= 50 && mouseY >= 750 && mouseY <= 800) {
      cursor(HAND);
    }
    else cursor(ARROW);

    helpWords();
  }

  //gamestate store
  else if (gameState === "Store") {
    background("white");
    image(storeCounter, 0, 400, 300, 400);
    exitShop();
    image(shelf, 0, 200, 300, 150)
    image(shelf, 300, 200, 300, 150)
    image(shelf, 300, 400, 300, 150)
    image(extraBg, 350, 370, 100, 100);
    image(extraBg2, 460, 370, 100, 100)
    // image(lock,153,170,253,270)
    multiButtons();
    if (mouseX >= 346 && mouseX <= 446 && mouseY >= 170 && mouseY <= 270) {
      cursor(HAND);
    }
    else if (mouseX >= 45 && mouseX <= 145 && mouseY >= 170 && mouseY <= 270) {
      cursor(HAND);
    }
    else if (mouseX >= 155 && mouseX <= 255 && mouseY >= 170 && mouseY <= 270) {
      cursor(HAND);
    }
    else if (mouseX >= 455 && mouseX <= 555 && mouseY >= 170 && mouseY <= 270) {
      cursor(HAND);
    }
    else if (mouseX >= 540 && mouseX <= 595 && mouseY >= 0 && mouseY <= 50) {
      cursor(HAND);
    }
    else if (mouseX >= 350 && mouseX <= 450 && mouseY >= 370 && mouseY <= 470) {
      cursor(HAND);
    }
    else if (mouseX >= 460 && mouseX <= 560 && mouseY >= 370 && mouseY <= 470) {
      cursor(HAND);
    }
    else cursor(ARROW);
    moreBackgrounds();
  }

  else if (gameState === 'Settings') {
    background('darkgrey')
    exitShop()
    if (mouseX >= 540 && mouseX <= 595 && mouseY >= 0 && mouseY <= 50) {
      cursor(HAND);
    }
    else if (mouseX >= 130 && mouseX <= 230 && mouseY >= 230 && mouseY <= 330) {
      cursor(HAND);
    }
    else if (mouseX >= 25 && mouseX <= 125 && mouseY >= 230 && mouseY <= 330) {
      cursor(HAND);
    }
    else if (mouseX >= 48 && mouseX <= 100 && mouseY >= 400 && mouseY <= 450) {
      cursor(HAND);
    }
    else if(mouseX >= 240 && mouseX <= 340 && mouseY >= 230 && mouseY <= 330){
      cursor(HAND);
    }
    else cursor(ARROW);

    push();
    textSize(50);
    fill("Black");
    text('SETTINGS', 160, 100);
    pop();

    push()
    textSize(30);
    fill("BLACK");
    text('Backgrounds', 25, 200);
    pop()

    image(extraBg, 130, 230, 100, 100);
    image(extraBg2, 240, 230, 100, 100)
    image(backGround, 20, 230, 100, 100);
    if (bgOneLocked === true) {
      image(lock, 130, 230, 100, 100)
    }
    if (bgTwoLocked === true) {
      image(lock, 240, 230, 100, 100)
    }

    audioSetting();
    push()
    fill("black");
    textSize(30);
    text('The man who made this all possible.', 100, 530)
    pop()
    image(scott, 260, 545, 150, 250)
  }

  else if (gameState === 'Sci-fi') {
    //if the gamestate is set to space background, do these: CATSPIN when clicked on cat, 
    image(extraBg2, 0, 0, 600, 800);
    image(settingsIcon, 0, 750, 50, 50)
    if (catHere) image(maxwellImage, 50, 300);
    if (catGif) image(maxwellGif, 50, 300);
    shopbutton();
    if (mouseX >= 50 && mouseX <= 210 && mouseY >= 300 && mouseY <= 420) {
      cursor(HAND);
    }
    else if (mouseX >= 500 && mouseX <= 600 && mouseY >= 750 && mouseY <= 800) {
      cursor(HAND);
    }
    else if (mouseX >= 0 && mouseX <= 50 && mouseY >= 750 && mouseY <= 800) {
      cursor(HAND);
    }
    else cursor(ARROW);

    helpWords();
  }

  counterText();
}

function counterText() {
  //the text for the counter/spins/currency
  textSize(32);
  fill('#C09642');
  text("Spins: " + count, 22, 32)
}

function mousePressed() {
  //mouse pressed functions

  //if the gamestate is in game mode then it will let me click the cat and earn spins which is the 
  //currency of this game
  if (gameState === 'Game' || gameState === 'space' || gameState === 'Sci-fi') {
    if (mouseX >= 50 && mouseX <= 210 && mouseY >= 300 && mouseY <= 420) {
      score();
      catGif = true;
      catHere = false;
      if (audioOn === true) {
        catSound.play();
      }
      gifTimer = millis();
    }
  }

  if (mouseX >= 0 && mouseX <= 50 && mouseY >= 750 && mouseY <= 800) {
    gameState = 'Settings'
  }

  //if i click the shop button it will then play the store function which will
  //swtich the gamestate into shop mode which will let your buy multipliers
  if (mouseX >= 500 && mouseX <= 600 && mouseY >= 750 && mouseY <= 800) {
    gameState = 'Store'
  }
  // if the red circle with the x in it is clicked then go back to the game
  if (gameState === 'Store' || gameState === 'Settings') {
    if (mouseX >= 540 && mouseX <= 595 && mouseY >= 0 && mouseY <= 50) {
      gameState = 'Game'
    }
  }

  //shop multiplier buttons.
  if (gameState === 'Store') {
    if (isLocked2 === false) {
      if (mouseX >= 43 && mouseX <= 145 && mouseY >= 170 && mouseY <= 270 && count >= 100) {
        count -= 100;
        twoTimesMulti = true;
        activeMulti = true;
        isLocked4 = false;
      }
    }
  }


  if (gameState === 'Store') {
    if (isLocked4 === false) {
      if (mouseX >= 153 && mouseX <= 253 && mouseY >= 170 && mouseY <= 270 && count >= 1000) {
        count -= 1000;
        fourTimesMulti = true;
        isLocked6 = false;
        isLocked2 = true;
      }
    }
  }

  if (gameState === 'Store') {
    if (isLocked6 === false) {
      if (mouseX >= 346 && mouseX <= 446 && mouseY >= 170 && mouseY <= 270 && count >= 5000) {
        count -= 5000;
        sixTimesMulti = true;
        isLocked8 = false;
        isLocked4 = true;
      }
    }
  }

  if (gameState === 'Store') {
    if (isLocked8 === false) {
      if (mouseX >= 455 && mouseX <= 555 && mouseY >= 170 && mouseY <= 270 && count >= 50000) {
        count -= 50000;
        eightTimesMulti = true;
        isLocked6 = true;
        isLocked8 = true;
      }
    }
  }

  if (gameState === 'Store') {
    if (mouseX >= 350 && mouseX <= 450 && mouseY >= 370 && mouseY <= 470 && count >= 2500) {
      count -= 2500;
      bgOneLocked = false;
    }
  }

  if (gameState === 'Store') {
    if (mouseX >= 460 && mouseX <= 560 && mouseY >= 370 && mouseY <= 470) {
      count -= 2500;
      bgTwoLocked = false;
    }
  }


  if (gameState === 'Settings') {
    if (bgOneLocked === false) {
      if (mouseX >= 130 && mouseX <= 230 && mouseY >= 230 && mouseY <= 430) {
        gameState = 'space';
      }
    }
  }
  if (gameState === 'Settings') {
    if (mouseX >= 25 && mouseX <= 125 && mouseY >= 230 && mouseY <= 330) {
      gameState = 'Game';
    }
  }

  if (gameState === 'Settings') {
    if (mouseX >= 48 && mouseX <= 100 && mouseY >= 400 && mouseY <= 450) {
      if (audioOn === true) {
        audioOn = false;
      }
      else if (audioOn === false) {
        audioOn = true;
      }
    }
  }
  if (gameState === 'Settings') {
    if (mouseX >= 240 && mouseX <= 340 && mouseY >= 230 && mouseY <= 330) {
      gameState = 'Sci-fi';
    }
  }

}

function shopbutton() {
  //this is the code for the shop button
  push();
  fill("White");
  rect(500, 750, 100, 50);
  textSize(25);
  fill("black")
  text('STORE', 508, 783)
  pop();
}

function exitShop() {
  //this is the code for the exit shop button
  push();
  fill("red")
  circle(570, 25, 50)
  fill("black")
  textSize(45);
  text('X', 555.5, 40);
  pop();
}

function multiButtons() {
  //2x multiplier shop button
  push()
  fill("lightgrey");
  rect(45, 170, 100, 100);
  fill("black");
  textSize(50);
  text('2X', 64, 240)
  textSize(13);
  fill("green");
  text('cost = 100 spins', 45, 300);
  if (isLocked2 === true) {
    image(lock, 55, 170, 100, 100)
  }
  pop()

  //4x multiplier shop button
  push()
  fill("lightgrey");
  rect(155, 170, 100, 100);
  fill("black");
  textSize(50);
  text('4X', 173, 240)
  textSize(13);
  fill("green");
  text('cost = 1000 spins', 155, 300);
  if (isLocked4 === true) {
    image(lock, 155, 170, 100, 100)
  }

  pop()

  //6x multiplier shop button
  push()
  fill("lightgrey");
  rect(346, 170, 100, 100);
  fill("black");
  textSize(50);
  text('6X', 366, 240)
  textSize(13);
  fill("green");
  text('cost = 5000 spins', 346, 300);
  if (isLocked6 === true) {
    image(lock, 346, 170, 100, 100)
  }
  pop()

  //8x multiplier shop button
  push()
  fill("lightgrey");
  rect(455, 170, 100, 100);
  fill("black");
  textSize(50);
  text('8X', 474, 240)
  textSize(13);
  fill("green");
  text('cost = 50000 spins', 455, 300);
  if (isLocked8 === true) {
    image(lock, 455, 170, 100, 100)
  }
  pop()
}

function score() {
  //score count and multiplier counts
  if (activeMulti === false) {
    count += 100000
  }

  if (twoTimesMulti === true) {
    count = count + clickValue * 2;
  }

  if (fourTimesMulti === true) {
    twoTimesMulti = false;
    count = clickValue * 2 * 4 + count;
  }

  if (sixTimesMulti === true) {
    fourTimesMulti = false;
    count = clickValue * 2 * 4 * 6 + count;
  }

  if (eightTimesMulti === true) {
    sixTimesMulti = false;
    count = clickValue * 2 * 4 * 6 * 8 + count;
  }
}

function moreBackgrounds() {
  push();
  fill('green');
  textSize(13);
  text('cost = 2500 spins', 350, 500)
  pop();

  push();
  fill('green');
  textSize(13);
  text('cost = 2500 spins', 460, 500)
  pop();
}

function helpWords() {
  push();
  fill(0, 0, 0, 200);
  rect(180, 0, 440, 150)
  fill("blue");
  stroke("black");
  strokeWeight(0.7);
  textSize(15);
  text('Welcome to my clicker game!', 180, 20);
  text('Here are details on the game and how to play:', 180, 35);
  text('-Click Maxwell to earn spins.', 210, 50);
  text('-Use those spins in the shop.', 210, 65);
  text('-The shop contains Upgrades and Misc.', 210, 80);
  text('-To change the settings click the bottom left hand corner.', 210, 95);
  text('-The settings contains the backgrounds and audio options.', 210, 110);
  text('Thanks for playing my game and have fun!', 180, 125);
  text('Made by Ryder Martin CS30 Scott', 180, 140);
  pop();
}

function audioSetting() {
  push();
  textSize(30);
  fill("BLACK");
  text('Audio Controls (Green for on, red for off)', 25, 375);
  pop();

  push();
  if (audioOn === true) {
    fill('green')
  }
  else fill('red');

  circle(75, 425, 50);
  pop();
}