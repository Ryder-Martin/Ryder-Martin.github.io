// 2d array basics
// Ryder Martin
// 4/15/2026

// 0 black, 255 white
//grid is 6 x 5 in dimension

let grid = [];
let rows;
let cols;
let tileSize = 60;
let score = 0;
function setup() {
  randomisedStart();
  rows = grid.length;
  cols = grid[0].length;
  createCanvas(cols*tileSize, rows*tileSize);
}

function draw() {
  background(220);
  renderGrid();
  // textSize(15);
  // fill(255,0,0);
  // text(getCurrentX() + "," + getCurrentY(), mouseX, mouseY);
  winCondition();
}

function flip(x,y){
  if(grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

function winCondition(){
  let total = 0;
  for(let x=0; x < cols; x++){
    for(let y = 0; y < rows; y++){
      total += grid[y][x];
    }
  }
  if(total ===0 || total === ((cols*rows)*255)){
    let boxX = floor((constrain(mouseX, 0, width -1)) / tileSize);
    let boxY = floor((constrain(mouseY, 0, height - 1)) / tileSize);
    console.log("YOU WIN");
    finalTile = [boxX, boxY]
    completed = true
  }
}

function mousePressed(){
  if(mouseX < width && mouseY < height){
    if(keyIsDown(16)){
      let x = getCurrentX();
      let y = getCurrentY();
      flip(x, y);
    }
    else{
      let x = getCurrentX();
      let y = getCurrentY();
      flip(x, y);
     //if they exist
    //flip the cardinal(nesw) neighbors
    if(x-1 >= 0) flip(x-1,y);
    if(y-1 >= 0) flip(x,y-1);
    if(x+1 <= 6) flip(x+1,y);
    if(y+1 <= 6) flip(x,y+1); 
    }
  }
}

function renderGrid(){
  // interpret the data stored in the 2d array ( grid) and draw a matrix of squares to reflect it
  for(let y = 0; y < rows; y++){//y:0 1 2 3 4
    for(let x = 0; x < cols; x++){//x: 0 1 2 3 4 5
      let fillColor = grid[y][x];
      fill(fillColor);
      square(x*tileSize, y*tileSize, tileSize);
    }
  }
}

function getCurrentX(){
  //determine current col postiion of mouse
  let constrainedX = constrain(mouseX, 0, width-1);
  return floor(constrainedX / tileSize);
}

function getCurrentY(){
  //determine the current row postion of mouse
  let constrainedY = constrain(mouseY, 0, height-1);
  return floor(constrainedY / tileSize);
}

function randomisedStart(){
  grid = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];
  for(let x = 0; x < grid[0].length; x++){
    for(let y = 0; y < grid.length; y++){
      let r = random(1,2);
      if(r <= 1.5){
        flip(x,y);
      }
    }
  }
}