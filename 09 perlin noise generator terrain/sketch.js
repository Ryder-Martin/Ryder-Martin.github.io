// perlin noise terrain generator
// Ryer MArtin
// 3/3/2026
let rectWidth = 1;
let noiseTime = 5; 
let noiseSpeed = 0.01;

function setup() {
  createCanvas(250, 370);
  fill(0);
}

function generateTerrain() {
  //using a loop, construct a number of side byside rectangles with random heights to be 2D terrain
  for (let x = 0; x < width; x += rectWidth) {
    // generate random (negative height)
    // replace with noise
    let rectHeight = noise(noiseTime);      //random(0, height * 0.75);
    rectHeight = map(rectHeight,0,1,0,300);
    noiseTime += noiseSpeed;
    rect(x, height, rectWidth, -rectHeight);
  }
}

function widthChanger(){
  //using the left and right arrows have the rectWidth change
  if(keyIsPressed){
    if(keyCode===LEFT_ARROW){
      rectWidth -=0.1;
      if(rectWidth < 1){
        rectWidth = 1;
      }
    }
    if(keyCode===RIGHT_ARROW){
      rectWidth += 0.1;
    }
  }
  
}

function drawFlag(x,y){
  line(x,y,x,y-20);
  rect(x,y-20,7,7);
}

function draw() {
  noiseTime = 5;
  background(220);
  generateTerrain();
  widthChanger();
  drawFlag(100,100);
}