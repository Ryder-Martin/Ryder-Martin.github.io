// Image Manipulation
// Mr. Scott
// April 22, 2026

// Working with Images
// translation b/w 2D and 1D indices
// Part 2:  using video

let myImage;
let myVideo;

function preload(){
  //called BEFORE setup. Won't conclude
  //until all loads are complete.
   myImage = loadImage("assets/aviator.png");
}

function setup() {
// createCanvas(myImage.width, myImage.height);
  createCanvas(640,480);
  myVideo = createCapture(VIDEO);
  pixelDensity(1); 
  // myVideo.hide();
}

function draw() {
  background(220);
  // image(myImage, 0,0); for still image
  image(myVideo,0,0);
  //access and modify the pixels on the Canvas
  loadPixels();  //dumps data from canvas into array
  background('#C34E1B');
  // boost();
  // greyscale();
  // updatePixels();
  textImage();
}

function textImage(){
  fill("#EDE753");
  let scaleAmount = 2;
  textSize(scaleAmount);

  for(let x = 0; x < width; x += scaleAmount){
    for(let y = 0; y < height; y += scaleAmount){
      let avg = getAvg(x,y);
      if(avg > 210) text("𐂯",x,y);
      else if(avg > 180) text("☠", x, y); 
      else if(avg > 150) text("Ω", x, y); 
      else if(avg > 120) text("☯", x, y); 
      else if(avg > 90) text("☪", x, y); 
      else if(avg > 60) text("☿", x, y); 
      else if(avg > 30) text("ʊ", x, y); 
    }
  }
}

function boost(){
  //brightening filter
  let boostAmount = map(mouseX, 0, width,-100,100);
  for(let i = 0; i<pixels.length; i+=4){
    let r = pixels[i] + boostAmount;
    let g = pixels[i+1] + boostAmount;
    let b = pixels[i+2] + boostAmount;
    setPixelOneD(i,r,g,b);
  }
}

function getAvg(x,y){
  // return average intensity of rgb
  // at (x,y).
  let index = ((y*width) + x)*4;
  let r = pixels[index];
  let g = pixels[index+1];
  let b = pixels[index+2];
  return (r+g+b) / 3
}

function greyscale() {
  // use the average intensity of each pixel
  // to represent it as a shade of grey.
  for (let x = 0; x < width; x++){
    for (let y = 0; y < height; y++){
      let avg = getAvg(x,y);
      setPixel(x,y,avg,avg,avg);
    }
  }
}
function setPixel(x,y,r,g,b){
  //x,y → pixel location
  //r,g,b → color values
  let index = ((y*width) + x)*4;
  setPixelOneD(index,r,g,b);
}

function setPixelOneD(pos, r, g, b){
  //pos → 1D location of the pixel's red component
  //r,g,b → new color values (0-255) for the pixel
  pixels[pos] = r;
  pixels[pos+1] = g;
  pixels[pos+2] = b;
}