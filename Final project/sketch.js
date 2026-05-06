// Final project, Maxwell the cat clicker game
// Ryder Martin
// 4/29/2026

let maxwellImage;
let maxwellGif;

function preload(){
  maxwellImage = loadImage('assets/maxwell1.png')
  maxwellGif = loadImage('assets/maxwell.gif')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  maxwellGif.delay(5);
}

function draw() {
  background(220);
  image(maxwellGif,0,0);
  // image(maxwellImage,0,0);
}

function playGif(){
  
}

function stopGif(){

}

function mousePressed(){
  if(mouseX && mouseY === maxwellImage + mousePressed){
    image(maxwellGif,0,0);
  }
}