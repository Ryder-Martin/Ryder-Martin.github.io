// Final project, Maxwell the cat clicker game
// Ryder Martin
// 4/29/2026

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let mexCatImg;
let mexCatGif;
let shopOpen = false;
let backGround;
let maxwellImage;
let maxwellGif;
let catHere = true;
let catGif = false;
let catSound;
let count = 0;
let storeCounter;
let gameState = 'Game';

function preload() {
  maxwellImage = loadImage('assets/maxwell1.png');
  maxwellGif = loadImage('assets/maxwell.gif');
  catSound = loadSound('assets/Maxwell_oiia.mp3');
  backGround = loadImage('assets/Lofibackground.png');
  mexCatImg = loadImage('assets/MexMaxImg.png');
  mexCatGif = loadImage('assets/MexMaxGif.gif');
  storeCounter = loadImage('assets/StoreCounter.png');
}

function setup() {
  createCanvas(600, 800);
  maxwellGif.delay(1);
  mexCatGif.delay(8);
}

function draw() {
  //background and all other functions here
  if (gameState === 'Game') {
    //if the gamestate is set to game, do these: CATSPIN when cliced on, 
    // click on "STORE" button then go to the shop
    image(backGround, 0, 0, 600, 800);
    if (catHere) image(maxwellImage, 50, 300);
    if (catGif) image(maxwellGif, 50, 300);
    shopbutton();
    if (mouseX >= 50 && mouseX <= 210 && mouseY >= 300 && mouseY <= 420) {
      cursor(HAND);
    }
    else if (mouseX >= 475 && mouseX <= 575 && mouseY >= 700 && mouseY <= 733) {
      cursor(HAND);
    }
    else cursor(ARROW);
  }
  else if (gameState === "Store") {
    background("white");
    image(storeCounter, 0, 400, 300, 400);
    exitShop();
  }
  counterText();
}

function counterText() {
  //the text for the counter/spins/currency
  textSize(32);
  fill('#C09642');
  text("Spins: " + count, 30, 100)
}

async function mousePressed() {
  //mouse pressed functions

  //if the gamestate is in game mode then it will let me click the cat and earn spins which is the 
  //currency of this game
  if (gameState === 'Game') {
    if (mouseX >= 50 && mouseX <= 210 && mouseY >= 300 && mouseY <= 420) {
      count++
      catHere = !catHere;
      catGif = true;
      catSound.play();
      await sleep(1450);
      catGif = false;
      catHere = true;
    }
  }

  //if i click the shop button it will then play the store function which will
  //swtich the gamestate into shop mode which will let your buy multipliers
  if (mouseX >= 475 && mouseX <= 575 && mouseY >= 700 && mouseY <= 733) {
    store();
  }
  // if the red circle with the x in it is clicked then go back to the game
  if (gameState === 'Store') {
    if (mouseX >= 540 && mouseX <= 595 && mouseY >= 20 && mouseY <= 75) {
      gameState = 'Game'
    }
  }
}

function shopbutton() {
  //this is the code for the shop button
  push();
  fill("White");
  rect(475, 700, 100, 50);
  textSize(25);
  fill("black")
  text('STORE', 483, 733)
  pop();
}

function exitShop() {
  //this is the code for the exit shop button
  push();
  fill("red")
  circle(570, 50, 50)
  fill("black")
  textSize(45);
  text('X', 555.5, 65);
  if (mouseX >= 540 && mouseX <= 595 && mouseY >= 20 && mouseY <= 75) {
    cursor(HAND);
  }
  else cursor(ARROW);
  pop();
}

function store() {
  //this is the function that will switch the game state into shop mode
  //this will allow you to buy multipliers and maybe backgrounds if i get to it
  //and will also have the exit shop button pop up.
  gameState = 'Store'
}