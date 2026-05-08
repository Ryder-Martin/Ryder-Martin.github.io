// Final project, Maxwell the cat clicker game
// Ryder Martin
// 4/29/2026

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let shopOpen = false;
let backGround;
let maxwellImage;
let maxwellGif;
let catHere = true;
let catGif = false;
let catSound;
let count = 0;

function preload(){
  maxwellImage = loadImage('assets/maxwell1.png');
  maxwellGif = loadImage('assets/maxwell.gif');
  catSound = loadSound('assets/Maxwell_oiia.mp3');
  backGround = loadImage('assets/Lofibackground.png');
}

function setup() {
  createCanvas(600, 800);
  maxwellGif.delay(1);
}

function draw() {
  //background and all other functions here
  background(220);
  image(backGround,0,0,600,800);
  if(catHere)image(maxwellImage,50,300);
  if(catGif)image(maxwellGif,50,300);
  counterText();
  store();
}

function counterText(){
  //the text for the counter/spins/currency
  textSize(32);
  fill('#C09642');
  text("Spins: " + count, 30,100)
}

async function mousePressed(){
  //when mouse is clicked hide image, play gif, add 1 to counter/currency and play the oiia audio.
  if(mouseX > maxwellImage && mouseX < maxwellImage && mouseY > maxwellImage && mouseY < maxwellImage){
    count++
    catHere = !catHere;  
    catGif = true;
    catSound.play();
    await sleep(1450);
    catGif = false;
    catHere = true;
  }
  
}

// function store(){
//   rect(475,700,100,50);
//   text('STORE',505,730)
//   if(mouseX && mouseY )
//   // catHere = false;
//   // catGif = false;
//   // backGround = false;
// }