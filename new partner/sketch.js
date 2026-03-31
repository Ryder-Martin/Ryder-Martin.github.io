

let img;
let img2;
let x= 0;
let y= 0;
let x2 = 0;
let y2 = 0;
function preload(){
  img = loadImage('ship.png')
  img2 = loadImage('laser2.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}



function draw() {
  background(0);
  if(keyIsDown){
    if(keyCode === 32){
      x2 = x+50; y2 = y
      image(img2,x2,y2,100,100); 
    }
  }
  image(img,x,y,200,200);
  move();
}

function move(){
  if(keyIsDown(LEFT_ARROW)){
    x -= 15
  }
  if(keyIsDown(RIGHT_ARROW)){
    x += 15
  }
  if(keyIsDown(UP_ARROW)){
    y -= 15
  }
  if(keyIsDown(DOWN_ARROW)){
    y += 15
  }
  if(x<0){
    x=width
  }
  if(x>width){
    x=0
  }
  if(y<0){
    y=height
  }
  if(y>height){
    y=0
  }

}

function laserMove(){

}


class laser{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  move(x,y){
    
  }

  display(){
    
  }

  action(){
    this.move()
    this.display()
  }
}