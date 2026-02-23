// state variables and real time
// Ryer AMartin
// feb 23rd, 26

// global variables
let shapeState= 0; // 0-circle 1-square 2-triangle 3- starburst
let startTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  startTime = millis();
}

function draw() {
  background(220);
  drawShape();
  manageTime();
}

function drawShape(){
  // function inspects the shapestate variables and draws the appropriate shape on the canvas
  let x = width/2; let y = height/2;
  switch(shapeState){
    case 0:
      circle(width/2, height/2, 150);
      break;
    case 1:
      square(width/2, height/2, 150);
      break;
    case 2:
      triangle(x-50, y+50, x+50, y+50, x,y-25);
      break;
    case 3:
      for(let i =0; i < 30; i++){
        let x2 = random(x-80,x+80);
        let y2 = random(y-80,y+80);
        line(x,y,x2,y2);
      }
      break;
}
}

function keyPressed(){
  updateState();
}

function updateState(){
  shapeState++;
  if(shapeState > 3) shapeState = 0; 
}

function manageTime(){
  // this function will reset the timer and update the shapestate once every 2 seconds
  let elapsedTime = millis() - startTime;
  if(elapsedTime > 1000){
    updateState();
    startTime - millis(); 
  }
}