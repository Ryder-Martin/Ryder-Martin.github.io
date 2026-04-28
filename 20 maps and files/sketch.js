// maps and files demo
// Ryder martin
// 4/221/2026

let textFile;
let imageFile, rows, cols, colorMap;

function preload(){
  textFile = loadStrings('assets/info.txt');
  imageFile = loadStrings('assets/colorimage.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  //determine the # of rows and cols
  rows = imageFile.length
  cols = imageFile[0].length

  //construct the map of colrs
  colorMap = new Map([
    ['b', 'black'],
    ['w', color(255)],
    ['r', 'red'],
    ['l', 'brown'],
    ['p', 'purple']
  ])
}

function drawImage(){
  //read through our text info and construct an image
  let pixelSize = 25;
  for(let y = 0; y < rows; y++){
    let currentRow = imageFile[y];
    for(let x = 0; x < cols; x++){
      let currentKey = currentRow[x];
      fill(colorMap.get(currentKey));
      square(x*pixelSize, y*pixelSize, pixelSize);
    }
  }
}

function draw() {
  background(220);
  // processText();
  drawImage();
}

// function processText(){
//   //look at three differnt ways to split up larger strings into words or charactors, speically the slit() and spread syntax
//   print("SPLIT INTO WORDS");
//   let splitWords = textFile[0].split(' ');
//   print(splitWords);

//   print("split into charctors");
//   let splitChars = textFile[1].split("");
//   print(splitChars);

//   print("spread into charactors");
//   let spreadChars = [...textFile[2]];
//   print(spreadChars);
// }