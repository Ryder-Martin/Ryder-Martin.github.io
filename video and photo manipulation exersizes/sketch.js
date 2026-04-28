// Photo/video manipulation exersizes
//RYder martin
//4/24/2026

let image1; let image2; let image3; let image4;


function preload(){
  image1 = loadImage("assets/chip.jpg");
  image2 = loadImage("assets/race.jpg");
  image3 = loadImage("assets/nuit.jpg");
  image4 = loadImage("assets/hand.jpg");
}

function setup() {
  createCanvas(image1.width, image1.height);

}

function draw() {
  background(220);
  //image1 for the first exersize, 2 for the half normal half no green, 3 for the five color and 4 for the mirror
  // image(image1,0,0);
  // image(image2,0,0);
  // image(image3,0,0)
  image(image4,0,0)
  loadPixels();
  // majColor();
  // goAwayGreen();
  // fiveColor();
  mirror();
  updatePixels();
}

function majColor(){
  //sets each to pixel to the RGB value that is the highest
  for (let x = 0; x < width; x++){
    for (let y = 0; y < height; y++){
      let index = ((y*width) + x)*4;
      let r = pixels[index];
      let g = pixels[index+1];
      let b = pixels[index+2];
      if(r > g && r > b) setPixel(x,y,255,0,0);
      else if(g > r && g >b) setPixel(x,y,0,255,0);
      else setPixel(x,y,0,0,255);
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

function goAwayGreen(){
  //all pixels on the right side of the screen will have no green RGB value
  for (let x = 0; x < width; x++){
    for (let y = 0; y < height; y++){
      let index = ((y*width) + x)*4;
      let r = pixels[index];
      let g = pixels[index+1];
      let b = pixels[index+2];
      if(x > width/2) setPixel(x,y,r,0,b);
    }
  }
}

function fiveColor(){
  //five colors will switch depending on the avg rgb intensity
  for (let x = 0; x < width; x++){
    for (let y = 0; y < height; y++){
      if(getAvg(x,y) >= 205 && getAvg(x,y) <= 255) setPixel(x,y,170,230,220)
      else if(getAvg(x,y) >= 155 && getAvg(x,y) <= 204) setPixel(x,y,105,150,210)
      else if(getAvg(x,y) >= 105 && getAvg(x,y) <= 154) setPixel(x,y,120,180,60)
      else if(getAvg(x,y) >= 55 && getAvg(x,y) <= 104) setPixel(x,y,130,30,130)
      else setPixel(x,y,90,10,50)
    }
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



function mirror(){
  for (let x = 0; x < width; x++){
    for (let y = 0; y < height; y++){

      if(x> width/2){
        src = (width-1 - x)
        let index = ((y*width) + src)*4;
        let r = pixels[index];
        let g = pixels[index+1];
        let b = pixels[index+2];
        if(width-1 > width/2){
          setPixel(x,y,r,g,b)
        }
        
      }
    }
  }
}

function getColor(){

}