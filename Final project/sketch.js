// Final project, Maxwell the cat clicker game
// Ryder Martin
// 4/29/2026

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let maxwellImage;
let maxwellGif;
let catHere = true;
let catGif = false;
let catSound;

function preload(){
  maxwellImage = loadImage('assets/maxwell1.png');
  maxwellGif = loadImage('assets/maxwell.gif');
  catSound = loadSound('assets/Maxwell_oiia.mp3');
}

function setup() {
  createCanvas(400, 400);
  maxwellGif.delay(1);
}

function draw() {
  background(220);
  // image(maxwellGif,0,0);
  if(catHere)image(maxwellImage,100,100);
  if(catGif)image(maxwellGif,100,100);
}

function playGif(){
  
}

function stopGif(){

}

async function mousePressed(){
  catHere = !catHere;  
  catGif = true;

  await sleep(2000);
  catGif = false;
  catHere = true;
}