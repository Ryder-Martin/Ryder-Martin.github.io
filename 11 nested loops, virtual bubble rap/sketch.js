// nested loops and virtual bubble rap
// Ryder Martin
// 3/6/2026

let bubbleSize = 10;
let bubbles = [];
let r = random(0,255);
let g = random(0,255);
let b = random(0,255);
function setup() {
  createCanvas(245, 375);
  populateArray();
}

function draw() {
  background(220);
  drawBubble();
  if(key === " " && keyIsPressed){
    let b = {x: mouseX, y: mouseY};
    bubbles.push(b);
  }
}

function eDist(x1,y1,x2,y2){
  //calculate the straight the straight line distance
  let a = x1-x2; let b = y1-y2;
  let c = sqrt(pow(a,2) + pow(b,2));
  return round(c);
} 

function drawBubble(){
  //through our array and display a bubble at each pos and possibly delete if mouse is close
  
  //loop by index bc we want to be able to delete
  for(let i = 0; i< bubbles.length; i++){
    let b = bubbles[i];
    circle(b.x,b.y,bubbleSize);
    textAlign(CENTER,CENTER);
    let d = eDist(b.x,b.y,mouseX,mouseY);
    // text(d, b.x,b.y);
    //where in the array is b???? no idea
    //check if we are overtop of the current bubble, then delete is so:
    if(d < bubbleSize/2 && mouseIsPressed){
      //to delete from array, use splice()
      bubbles.splice(i,1);
    }
  }
}

function populateArray(){
  //simple nested loop test to make ordered pairs:
  for(let x = 0; x<=width; x+=bubbleSize){
    //x:0,30,60,....... right edge
    for(let y = 0; y <= height; y+=bubbleSize){
      //y:0,30,60,............... bottom edge
      let b = {x: x+random(-3,3), y: y+random(-3,3)};
      bubbles.push(b);
    }
  }
}
