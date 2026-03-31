// planets and moons
// ryder martin
// 3/26/2026

//globals
let myPlanet;
let img;
let maskLayer;
const imageSizeX = 125;
const imageSizeY = 125;

function preload(){
  img = loadImage("earth.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  myPlanet = new Planet(width/2, height/2);
  maskLayer = createGraphics(imageSize, imageSize);
  maskLayer.fill('rgba(0, 0, 0, 1)');
  maskLayer.circle(imageSizeX / 2, imageSizeY / 2, imageSize);
  img.mask(maskLayer); 
}

function draw() {
  background(0);
  myPlanet.display();
}

function mousePressed(){
  //regular lick -> add moon
  //shift click -> destroy and reset moon
  if(keyIsPressed && keyCode === SHIFT){
    myPlanet = new Planet(width/2,height/2);
  }
  else myPlanet.createMoon();
}

function keyPressed(){
  if(keyCode !== SHIFT){
    myPlanet.x = mouseX;
    myPlanet.y = mouseY;
  }
}

class Planet{
  //constructor
  constructor(x,y){
    this.x = x; this.y = y; this.s = 100;
    this.moons = [];
  }

  //class methods
  createMoon(){
    this.moons.push(new Moon());
  }

  display(){
    //draw the planet + all of its moons
    circle(this.x,this.y,this.s);
    image(img, width / 2 - imageSize / 2, height / 2 - imageSize / 2, imageSize, imageSize);

    //for the moons
    for(let m of this.moons){
      m.update(this.x,this.y);
    }

  }
}

class Moon{
  constructor(){
    this.speed = random(1,5); //angular speed
    this.angle = 0;
    this.orbitRadius = random(100,200);
    this.s = random(10,50);
  }

  //class methods
  move(){
    this.angle += this.speed;
  }

  display(x,y){
    push();
    translate(x,y);
    rotate(this.angle);
    circle(this.orbitRadius, 0, this.s);
    pop();
  }

  update(x,y){
    //helper method to handla all internal methods calls
    this.move();
    this.display(x,y);
  }

}