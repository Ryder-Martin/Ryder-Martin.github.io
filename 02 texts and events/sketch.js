// Texts and events
// Ryder Martin
// Feb,9th,26

// global vaiable section
let textShade = 255;
let textScale = 40;
let bgcolor = "grey";

function setup() {
  createCanvas(windowWidth, windowHeight);
}
function displayMouse(){
  // this function will report some system variables related to mouse onto the screen via text()
  
  //mouseX, mouseY -> store current mouse pos
  // mouse is pressed -> boolean: button pressed?
  //  ggod for mouseHeld events

  // try using mouseIsPressed to change the size
  // becuase draw() runs 60 times a second, usally mouseIsPressed will be check 4-10 times per click event

  // if(mouseIsPressed){
  //   textScale = int(random(10,100)); // 10,99
  // }

  textSize(textScale);
  fill(textShade);
  text(mouseX + ","+ mouseY + "," + mouseIsPressed + "," + mouseButton, mouseX, mouseY);
}

function mousePressed(){
  // this is a p5 function
  // automatically called exactly once per mousePress(on down action)
  textShade = int(random(0,255));
}

function displayKeyboard(){
  // we'll use this function to inspect some of p5's keyboard capabilities
  //
  // keyIsPressed -> is a keybaord button pressed"
  //key -> last pressed key(non-coded)
  //keyCode_> last pressed coded key

  if(keyIsPressed){
    //something wes pressed. next, check which key/keycode is pressed
    if(key === " "){
      bgcolor = color(random(255), random(255), random(255));
    }
  }


  textSize(30);
  textAlign(CENTER, CENTER);
  let t = keyIsPressed + "," + key + "," + keyCode;
  text(t, width/2, height/2);
}

function keyPressed(){
  // called automatically once per keyboard event
  if(keyCode === 65){
    bgcolor = color(random(255), random(255), random(255));
  }
}

function draw() {
  // goal: keep draw() tidy
  background(bgcolor);
  // displayMouse()
  displayKeyboard()
}
