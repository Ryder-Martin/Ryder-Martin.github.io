// snake
// ryder martin
// 3/12/2026

let x, y;
let posList = [];
const NUM_SEGMENTS = 5000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER); angleMode(DEGREES);
  x = width/2; y = height/2;
  for(let i = 0; i < NUM_SEGMENTS; i++){
    posList.push({x:x, y:y, r:frameCount});

  }
}

function renderSnake(){
  for(let p of posList){
    let r = random(0,255);
    let g = random(0,255);
    let b = random(0,255);
    color(r,g,b);
    push();
    translate(p.x,p.y);
    rotate(p.r);
    square(0,0,20);
    pop();
    p.r+=2
  }
}

function move(){
  if(keyIsDown(LEFT_ARROW)) x-=4;
  if(keyIsDown(RIGHT_ARROW)) x+=4;
  if(keyIsDown(UP_ARROW)) y-=4;
  if(keyIsDown(DOWN_ARROW)) y+=4;
  //every movement step, add a new segment and delete oldest segment
  posList.splice(0,1);
  posList.push({x:x, y:y, r:frameCount});
}

function draw() {
  background(220);
  move();
  renderSnake();
}
