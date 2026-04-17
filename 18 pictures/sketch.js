// working with images
// Ryder Martin
// 4/14/2026
// how to load images
// how to play animations

let lionL, lionR;
let dir = "left";
let pinImages = [];
let current = 0; // pinwheel curr index

async function loadAssets(){
  //load lions
  lionL = loadImage('assets/lion-left.png')
  lionR = loadImage('assets/lion-right.png')

  //pinWheel images
  for(let i = 0; i <= 8; i++){
    pinImages.push(loadImage("assets/pin-0"+i+".png"));  
  }
}


async function setup() {
  createCanvas(windowWidth, windowHeight);
  await loadAssets();
  
}

function draw() {
  background(220);
  lion();
  pinwheel();
}

function pinwheel(){
  image(pinImages[current], width/2, height*0.7);
  if(frameCount%3===0){
    current = (current+1) % 9;
  }
}

function lion(){
  // update state variable based on mouse movement
  if(movedX < 0) dir = "left";
  else if (movedX > 0) dir = "right";

  if(dir === "left"){
    image(lionL, mouseX,mouseY,lionL.width/2, lionL.height/2);  
  }
  else{
    image(lionR, mouseX,mouseY,lionL.width/2, lionL.height/2);
  }
  imageMode(CENTER);
}

