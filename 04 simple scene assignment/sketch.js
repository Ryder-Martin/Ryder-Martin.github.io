// 
// Ryder Martin
// feb 11, 26

// global variables
let seed;
let x = 0;
let y = 0;
let showFlag = false;

function setup() {
  createCanvas(150, 150);
  seed = random(1,100);
}

function forview(){
  // I WILL STEAL THE MOON! (the spots are for the craters on the moon)
  push();
  function moon(){
    push();
    fill("lightgrey");
    circle(75,190,150)
    fill(0);
    circle(45,130,5);
    circle(83,125,5);
    circle(69,142,5);
    circle(100,137,5);
    circle(30,140,5);
    circle(119,145,5);
    pop();
  }
  moon();
  pop();
}

function flag(){
  //the flag that is on the moon
  push();
  noStroke();
  fill(115, 133, 149);
  rect(110,87,5,40);
  fill("white");
  rect(115,87,25,20);    
  pop();
}

function flagMiddle(){
  //this is what is shown for the middle of the flag icon
  fill("orange");
  circle(127,97,14);
  fill(0);
  rect(124,94,.3,3);
  rect(130,94,.3,3);
  fill("red");
  arc(127,99,5,5, 0, 179.1,PIE);
}

function sun(){
  // the sun at the top left hand corner
  push();
  fill("yellow");
  stroke(255,116,0);
  ellipse(0,0,40,40);
  pop();
}

function stars(){
  //circular stars and has them go to a random place in the scene
  fill("white");
  circle(random(4,145), random(4,145),5);
}

function alien(x,y){
  push();
  translate(x-100,y-100);
  // make a simple alien using simple shapes (this is from the past demo but it works well for my scene)
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
    arc(100.5,111,14,14, 0, 179.1,PIE);
    pop();
  }
  function legs(){
    fill(225,218,185);
    rect(80,125,3,10);
    rect(117,125,3,10);
    rect(73,135,10,3);
    rect(110,135,10,3);
  }
  function antenna(){
    fill(212,175,55);
    circle(100,71,5);
    fill(225,218,185);
    rect(99.5,73,1,7);
  }
  function leftArm(){
    push();
    fill(225,218,185);
    translate(76, 108);
    rotate(20);
    rect(0,0,3.5,15);
    circle(2,15,7);
    pop();
  }
  function rightArm(){
    push();
    fill(225,218,185);
    translate(121,109);
    rotate(-20);
    rect(0,0,3.5,15);
    circle(2,15,7);
    pop();
  }
  function goldTeeth(){
    push();
    fill("gold");
    rect(97,111.5,3,3);
    rect(101,111.5,3,3);
    pop();
  }
  eyes();
  legs();
  antenna();
  smile();
  leftArm();
  rightArm();
  goldTeeth();
  pop();
}

function alienMove(){
  // allows the alien to move
  x = mouseX;
  y = mouseY;
  alien(x,y);
}

function keyPressed(){
  // changes if the flags face is happy or sad
  if(key === ' '){
    showFlag = !showFlag;
  }
}


function flagMiddleAlt(){
  // this is the sad version of the middle of the flag
    fill("orange");
    circle(127,97,14);
    fill(0);
    rect(124,94,.3,3);
    rect(130,94,.3,3);
    fill("red");
    arc(127,101,5,5, 179.1, 0,PIE);
}

function draw() {
  randomSeed(seed);
  background(0);
  for(let i = 0; i < 38; i++){
    stars();
  }
  forview();
  flag();     
  sun();
  if(showFlag === true){
    flagMiddleAlt();
  }
  if(showFlag === false){
    flagMiddle();
  }
  alienMove();
  fill(255);
  textSize(5);
  stroke(0);
  text('Ryder Martin', 120,147);
}