// multi keypress detection and drawing exersize
// Ryder Martin
// feb 10th, 26

//global variables

function setup() {
  createCanvas(200, 200);
  angleMode(DEGREES);
}

function alien(){
  // make a simple alein using simple shapes
  noStroke();
  fill(255, 218, 185);
  circle(100,100,40);
  rect(80,100,40,25)
  function eyes(){
    //eyes of the alien
    fill(0);
    circle(90,100,5);
    circle(110,100,5);
  }
  function smile(){
    push();
    fill(0);
    rect(93,110,15,1);
    fill("red");
    stroke(color("black"))
    arc(100.5,111,14,14, 0, 180,PIE);
    pop();
  }
  function legs(){
    fill(225,218,185);
    rect(80,125,3,10);
    rect(117,125,3,10);
  }
  function antenna(){
    fill(225,218,185);
    circle(100,71,5);
    rect(99.5,73,1,7);
  }
  function leftArm(){
    push()
    fill(225,218,185);
    translate(76, 108);
    rotate(20);
    rect(0,0,3.5,15);
    pop();
  }
  function rightArm(){
    push();
    fill(225,218,185);
    translate(121,109);
    rotate(-20);
    rect(0,0,3.5,15);
    pop();
  }
  eyes();
  legs();
  antenna();
  smile();
  leftArm();
  rightArm();
}

function checkMulti(){
  // a function to demonstrate how we can check if multiple keyboard buttons are pressed at once
  
  strokeWeight(mouseX/10);
  stroke(225,0,0);

  // check for multiple keypresses(3 simult.)
  let a = keyIsDown(65); // a
  let b = keyIsDown(66); // b
  let c = keyIsDown(67); // c

  let str = "a: " + a + " b: " + b + " c: " + c;
  text(str, 100,300)

}

function draw() {
  // keep draw tidy
  background(255);
  checkMulti();
  //alien();
}
