// Basic Transformations Sandbox


let originalSpacing = 20;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //ALL TRANSFORMATION RESET AT DRAW
  //background(255);
  drawBasicGrid(220);


  //transformation one: TRANSLATION
  // push();//copies original coordinate sysstem
  // translate(200,150);//x,y,(z)
  // drawBasicGrid(150);
  // rectangleRed(0,0);
  // pop(); //back to original 0,0 corner
  
  // translate(100,300);
  // rectangleBlue(0,0);
  //add push()  pop()

  // background(225);
  // //transformation two: SCALE
  // let s =  map(mouseX,0,width,0.1,8);
  // translate(200,200);
  // scale(s);//0-1 reduction, 1 no change, >1 enlargement
  // rectMode(CENTER);
  // rectangleRed(50,50);



  //transformation three: ROTATION
  //reminder: rotations are measured in radians, not degrees! Functions can help with the conversion...
  angleMode(DEGREES);
  // rotate(45);
  // drawBasicGrid(150);


  //Combinations of Transformations
  translate(200,200);
  scale(2);
  rotate(frameCount/3);
  noFill();
  circle(0,0,150)
  let n = 8
  for(let i = 0; i<n; i++){
    line(0,0,75,0);
    rotate(360/n);
  }
  

}


function face(x, y) {
  //draw a face at x,y
  push();
  translate(x,y);
  ellipseMode(CENTER);
  fill(200,200,0);
  stroke(0);
  ellipse(0,0,80,80);
  fill(90, 140, 30, 220);
  triangle(-20, 20, 20, 20, 0, 30);
  fill(0);
  ellipse(-25,0,10,10);
  ellipse(25,0,10,10);
  strokeWeight(5);
  line(-30,-10,30,-10);
  strokeWeight(1);
  pop();

}

function rectangleRed(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) - to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(255, 0, 0, 150);
  rect(x, y, 50, 50);

}

function rectangleBlue(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) - to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(0, 0, 255, 150);
  rect(x, y, 50, 50);

}

function drawBasicGrid(shade) {
  //draw the normal cartesian Coordinate Grid, in a light color. Spaced at 20 px by default
  stroke(shade);
  for (let x = 0; x < width; x += 20) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 20) {
    line(0, y, width, y);
  }

  //Draw "X" at the origin
  strokeWeight(3);
  stroke(0);
  line(-5,0,5,0);
  line(0,5,0,-5);
  strokeWeight(1);
}