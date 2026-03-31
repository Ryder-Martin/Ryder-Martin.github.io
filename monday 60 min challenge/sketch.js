let items = [];
let provinces = new Map();
let currentProv = "SK";

// Extension 2: keep original prices for temporary sale
let originalPrices = [];
let saleActive = false;

function setup() {
  createCanvas(400, 400);
  
  // Phase 1: Create inventory of 20 items
  for (let i = 0; i < 20; i++) {
    let base = random(10, 100);
    items.push({
      x: random(20, width - 80),
      y: random(-400, 0),
      speedY: random(1, 3),
      basePrice: base,
      name: "Item " + (i + 1)
    });
    originalPrices.push(base); // store permanent price
  }
  
  // Phase 2: Create province tax map
  provinces.set("SK", {tax: 1.11});
  provinces.set("AB", {tax: 1.05});
  provinces.set("ON", {tax: 1.13});
  
  // Extension 3: add a volatile USA rate
  provinces.set("USA", {tax: 1.20});
}

function draw() {
  background(30); // darker background for stronger contrast
  
  // Phase 3: Get current province rules
  let rules = provinces.get(currentProv);
  
  // Dynamic Economy: every 60 frames, nudge USA rate
  if (frameCount % 60 === 0) {
    let usa = provinces.get("USA");
    if (usa) {
      let newRate = usa.tax + random(-0.05, 0.05);
      newRate = constrain(newRate, 0.8, 1.5);
      provinces.set("USA", { tax: newRate });
    }
  }
  
  // Flash Sale: check if S key is held
  if (keyIsDown(83)) { // 83 = 'S'
    if (!saleActive) {
      saleActive = true;
      for (let i = 0; i < items.length; i++) {
        items[i].basePrice = originalPrices[i] / 2;
      }
    }
  } else {
    if (saleActive) {
      saleActive = false;
      for (let i = 0; i < items.length; i++) {
        items[i].basePrice = originalPrices[i];
      }
    }
  }
  
  // HUD text (larger)
  fill(255);
  textAlign(LEFT, BASELINE);
  textSize(20);
  text("Province: " + currentProv, 20, 30);
  textSize(18);
  text("Tax: " + rules.tax.toFixed(2) + "x", 20, 55);
  textSize(14);
  text("1=SK  2=AB  3=ON  4=USA", 20, 80);
  text("X: clear item   S: flash sale (hold)", 20, 100);
  
  // Main loop through items
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    
    // Update position
    item.y += item.speedY;
    if (item.y > height + 40) {
      item.y = -40;
      item.x = random(20, width - 80);
    }
    
    // Draw price tag (brighter rect for contrast)
    fill(255, 220, 120);
    stroke(0);
    strokeWeight(2);
    rect(item.x, item.y, 80, 50, 5); // slightly bigger tag, rounded corners
    
    // Item name (bigger)
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(item.name, item.x + 40, item.y + 15);
    
    // Total price with tax (much bigger)
    let totalPrice = item.basePrice * rules.tax;
    textSize(16);
    text("$" + totalPrice.toFixed(0), item.x + 40, item.y + 35);
  }
}

function keyPressed() {
  // Phase 4: Province switching
  if (key === '1') {
    currentProv = "SK";
  } else if (key === '2') {
    currentProv = "AB";
  } else if (key === '3') {
    currentProv = "ON";
  } else if (key === '4') {
    currentProv = "USA";
  }
  
  // Extension 1: Inventory Clear (Deletion)
  if (key === 'X' || key === 'x') {
    // Remove last (most recent) item
    if (items.length > 0) {
      items.pop();
      originalPrices.pop();
    }
    
    // Pro Challenge (alternative): remove oldest item instead
    /*
    if (items.length > 0) {
      items.splice(0, 1);
      originalPrices.splice(0, 1);
    }
    */
  }
}
