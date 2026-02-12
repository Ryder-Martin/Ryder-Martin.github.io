// Basics of Coordinate Systems
// Ryder Martin
// Feb, 5th, 26
//
// In Python, we wrote "run-to-completion"
// (start at top, end at bottom)
//
// in p5.js, we write "interactive"
// setup() -> runs once, at the start
// draw() -> runs over and over (after setup)
//            targeting 60 times per second
//           
//         screen is updated at bottom of draw

//------------global variable section-----------
// we can declare variabes here
// we can initialaize variables here
//      simple data types
//    > don't have access to system variables
let circleX = 200;



function setup() {
  createCanvas(500, 400);
}

function draw() {
  // repeats over and over (automatically) 60 FPS
  // keep draw tidy
  background(100); //wipes the screen
  //drawTwoCircles();
  fiveCircles();
  moveableCircle();
}
function fiveCircles(){
  fill("orange");
  circle(0,0,50)
  circle(500,0,50);
  circle(250,200,50);
  circle(0,400,50);
  circle(500,400,50);
}
function moveableCircle(){
  fill("Yellow");
  let circleX = 0
  let circleY = 200
  circleX += 1;
  circle(circleX,circleY,50);

}

function drawTwoCircles(){
   //   r   g   b
  fill(200,100,20);
  stroke("#FFFF00");
  //     x  y  dia
  circle(circleX, 100, 50);

  // second circle
  fill("red");
  noStroke();
  circle(width/2, height/2, 200);
}