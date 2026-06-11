// Final exam demo
// Ryder Martin
// 6/10/2026

let gorilaIdle =[];
let gorilaSwipe = [];
let spiralImages = [];

//Gorilla
let gorilaState = 0;//0-idle 1 - swipe


let spirals = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);

  for(let i = 0; i < 16; i++){
    if(i<10){
      spiralImages.push(await loadImage('assets/Circle/circle0'+i+'.png'));
    }
    else{
      spiralImages.push(await loadImage("assets/Circle/circle"+i+".png"));
    }
  }

}

function draw() {
  background(220);
}
