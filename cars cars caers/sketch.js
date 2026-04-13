//aras cars cars
// RYder martin
// 3/27/2026

//global
let eastbound = [];
let westbound = [];
let trafficLight;

function setup() {
  createCanvas(800, 400);
  // puts cars into road
  for (let i = 0; i < 20; i++) {
    addCarToArray(eastbound, 1);
    addCarToArray(westbound, 0);
  }
  //traffic light
  trafficLight = new TrafficLight(width / 2, 70);
}

function draw() {
  background(100);
  //draws the road
  drawRoad();

  trafficLight.display();
  trafficLight.update();

  for (let v of eastbound) {
    v.action(trafficLight.isRed, eastbound);
  }

  for (let v of westbound) {
    v.action(trafficLight.isRed, westbound);
  }
}

function drawRoad() {
  noStroke();
  fill(30);
  rect(0, 100, width, 200);

  stroke(255);
  strokeWeight(4);
  drawingContext.setLineDash([20, 20]);
  line(0, height / 2, width, height / 2);
  drawingContext.setLineDash([]);
}

function mousePressed() {
  if (keyIsDown(SHIFT)) {
    addCarToArray(westbound, 0);
  } else {
    addCarToArray(eastbound, 1);
  }
}

function keyPressed() {
  //this is for when space bar is pressed the traffic light will turn red
  if (key === ' ') {
    trafficLight.turnRed();
  }
}

function addCarToArray(arr, direction) {
  let type = floor(random(2));
  let c = color(random(50, 255), random(50, 255), random(50, 255));
  let y = direction === 1 ? random(120, 170) : random(230, 280);
  let xSpeed = direction === 1 ? random(2, 6) : random(-6, -2);
  arr.push(new Vehicle(type, c, random(width), y, direction, xSpeed));
}

class Vehicle {
  //code for the cars
  constructor(type, c, x, y, direction, xSpeed) {
    this.type = type;
    this.c = c;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.xSpeed = xSpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    noStroke();

    if (this.type === 0) {
      //more code for the cars
      fill(this.c);
      rect(0, 0, 40, 18, 4);
      fill(255);
      rect(-10, -10, 10, 8, 2);
      rect(10, -10, 10, 8, 2);
      fill(0);
      ellipse(-12, 10, 10, 10);
      ellipse(12, 10, 10, 10);
    } else {
      //even more code
      fill(this.c);
      rect(0, 0, 55, 22, 4);
      fill(red(this.c) * 0.8, green(this.c) * 0.8, blue(this.c) * 0.8);
      rect(12, -4, 22, 18, 3);
      fill(0);
      ellipse(-18, 12, 11, 11);
      ellipse(18, 12, 11, 11);
      ellipse(0, 12, 11, 11);
    }

    pop();
  }

  move() {
    //JESUS DOES THIS CODE EVER END
    this.x += this.xSpeed;

    if (this.x > width + 40) {
      this.x = -40;
    } else if (this.x < -40) {
      this.x = width + 40;
    }
  }

  speedUp() {
    if (this.direction === 1) {
      this.xSpeed = min(this.xSpeed + 0.2, 15);
    } else {
      this.xSpeed = max(this.xSpeed - 0.2, -15);
    }
  }

  speedDown() {
    if (this.direction === 1) {
      this.xSpeed = max(this.xSpeed - 0.2, 0);
    } else {
      this.xSpeed = min(this.xSpeed + 0.2, 0);
    }
  }

  changeColor() {
    this.c = color(random(50, 255), random(50, 255), random(50, 255));
  }

  avoidCars(allCars) {
    //code for the avoid
    let safeDist = 70;
    let closest = null;
    let closestDist = Infinity;

    for (let other of allCars) {
      if (other === this) continue;
      if (abs(other.y - this.y) > 25) continue;

      let dx = other.x - this.x;

      if (this.direction === 1 && dx > 0 && dx < closestDist) {
        closestDist = dx;
        closest = other;
      }

      if (this.direction === 0 && dx < 0 && abs(dx) < closestDist) {
        closestDist = abs(dx);
        closest = other;
      }
    }

    if (closest && closestDist < safeDist) {
      this.speedDown();
      closest.speedUp();
    }
  }

  action(isRed, allCars) {
    if (!isRed) {
      this.avoidCars(allCars);
      this.move();

      if (random(100) < 1) this.speedUp();
      if (random(100) < 1) this.speedDown();
    }

    if (random(100) < 1) {
      this.changeColor();
    }

    this.display();
  }
}

class TrafficLight {
  //class code for the traffic light
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isRed = false;
    this.timer = 0;
  }
  //for it to turn red
  turnRed() {
    this.isRed = true;
    this.timer = 120;
  }

  update() {
    if (this.isRed) {
      this.timer--;
      if (this.timer <= 0) {
        this.isRed = false;
        this.timer = 0;
      }
    }
  }
  //show the traffic light
  display() {
    push();
    rectMode(CENTER);
    noStroke();

    fill(40);
    rect(this.x, this.y, 50, 110, 8);

    fill(this.isRed ? color(255, 0, 0) : color(80));
    ellipse(this.x, this.y - 25, 28, 28);

    fill(this.isRed ? color(80) : color(0, 255, 0));
    ellipse(this.x, this.y + 25, 28, 28);

    fill(80);
    rect(this.x, this.y + 65, 8, 30);
    pop();
  }
}
