// random vs noise
// ryder martin
// 2/27/2026
//looking at unpredictability, speciffically the differnce between uniformely distrubuted numbers and perlin noise

//global variables
// let seed;
let d1, d2;
let minSize = 5; let maxSize = 200;
let x1, x2, y, y2

// variables for using noise
let noiseTime = 5;
let noiseSpeed = 0.005;
let yNoiseTime = 10, yNoiseSpeed = 0.1;
//noise speed controls how connected the randm noise values are

let ySpeed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = width * 0.3; y1 = height * 0.5; x2 = width * 0.7; y2 = height * 0.5;
  // frameRate(3);
  // seed = random(1,100);
}

function draw() {
  background(0);
  // randomSeed(seed);
  // stars();
  // randomCircle();
  ySpeed = noise(yNoiseTime);
  ySpeed = map(ySpeed,0,1,-5,5);
  y2 = ySpeed;
  yNoiseTime += yNoiseSpeed;
  noiseCircle();
}

function stars() {
  //use random to generate 100 stars
  fill(255);
  for (let i = 0; i < 100; i++) {
    let x = random(0, width);
    let y = random(0, height);
    circle(x, y, 3);
  }

}

function randomCircle() {
  //draw a fixed circle with randomly changing diameter
  fill("orange");
  d1 = random(minSize, maxSize);
  circle(x1,y1,d1);
}

function noiseCircle(){
  //draw a fixed circle with randomly changing but smooth diameter
  fill(200,150,50);
  d2 = noise(noiseTime);//yields value between 0 and 1
  d2 = map(d2,0,1,minSize, maxSize);
  circle(x2,y2,d2);
  noiseTime += noiseSpeed;
}