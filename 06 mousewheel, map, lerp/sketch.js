// mousewheel, map, lerp
// Ryder martin
// 2/26/2026

//global variables
let x,y;
let diameter = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2; y = height/2;
  noFill();
  strokeWeight(2);
}



function draw() {
  background(220,40);
  circleChallenge();
  challengeShapeOne();
  challengeShapeTwo();
}


function mouseWheel(event){
  //negative scroll up
  //postive scroll down
  print(event.delta);
  if(event.delta<0){
    diameter += 5;
  }
  else{
    diameter = max(5, diameter -5);
  }
}

function circleChallenge(){
  x=lerp(x, mouseX, 0.15);
  y=lerp(y, mouseY, 0.15);
  // line(x,y,mouseX,mouseY);

  let r=map(x,0, width,0,255);
  let g=map(y,0,height,0,255);
  let b=120
  stroke(r,g,b);

  circle(x,y,diameter);
}

function challengeShapeOne(){
  x=lerp(x,mouseX,0.40);
  y=lerp(y,mouseY,0.40);
  let r=map(x,0,width,25,255);
  let g=map(y,0,height,25,255);
  let b=99
  stroke(r,g,b);

  rect(x,y,diameter,diameter);
}

function challengeShapeTwo(){
  x=lerp(x,mouseX,1);
  y=lerp(y,mouseY,1);
  let r=map(x,0,width,0,255);
  let g=map(y,0,height,0,255);
  let b=1
  stroke(r,g,b);

  ellipse(x,y,20,diameter);
}