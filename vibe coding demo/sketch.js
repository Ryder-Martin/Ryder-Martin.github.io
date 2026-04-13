let levelMap = [
  "1111111111111111",
  "1P0000000000000D1",
  "101111011111110101",
  "100001000000010001",
  "101101111011010101",
  "100100000010010001",
  "101101110110110101",
  "100000010000000001",
  "101111010111110101",
  "1000000000K0000001",
  "11111111111111111"
];

let tileSize = 64;
let fov = Math.PI / 3;
let depth = 1000;
let numRays;

let player;
let enemies = [];
let bullets = [];
let pickups = [];
let gameState = "play";
let shootCooldown = 0;
let hitFlash = 0;

function setup() {
  createCanvas(960, 540);
  numRays = width;

  for (let y = 0; y < levelMap.length; y++) {
    for (let x = 0; x < levelMap[y].length; x++) {
      let c = levelMap[y][x];
      if (c === "P") {
        player = {
          x: x * tileSize + tileSize / 2,
          y: y * tileSize + tileSize / 2,
          angle: 0,
          hp: 100,
          ammo: 24,
          keys: 0,
          moveSpeed: 2.3,
          rotSpeed: 0.045
        };
        levelMap[y] = levelMap[y].substring(0, x) + "0" + levelMap[y].substring(x + 1);
      } else if (c === "E") {
        enemies.push({ x: x * tileSize + 32, y: y * tileSize + 32, hp: 3, alive: true, cooldown: 0 });
        levelMap[y] = levelMap[y].substring(0, x) + "0" + levelMap[y].substring(x + 1);
      } else if (c === "A") {
        pickups.push({ type: "ammo", x: x * tileSize + 32, y: y * tileSize + 32, taken: false });
        levelMap[y] = levelMap[y].substring(0, x) + "0" + levelMap[y].substring(x + 1);
      } else if (c === "H") {
        pickups.push({ type: "health", x: x * tileSize + 32, y: y * tileSize + 32, taken: false });
        levelMap[y] = levelMap[y].substring(0, x) + "0" + levelMap[y].substring(x + 1);
      } else if (c === "K") {
        pickups.push({ type: "key", x: x * tileSize + 32, y: y * tileSize + 32, taken: false });
        levelMap[y] = levelMap[y].substring(0, x) + "0" + levelMap[y].substring(x + 1);
      }
    }
  }

  if (!player) {
    player = { x: 96, y: 96, angle: 0, hp: 100, ammo: 24, keys: 0, moveSpeed: 2.3, rotSpeed: 0.045 };
  }

  if (enemies.length === 0) {
    enemies.push({ x: 9 * tileSize + 32, y: 2 * tileSize + 32, hp: 3, alive: true, cooldown: 0 });
  }
}

function draw() {
  if (gameState !== "play") {
    drawEndScreen();
    return;
  }

  background(0);
  handleInput();
  updateEnemies();
  updateBullets();
  collectPickups();
  handleDoor();
  renderScene();
  renderSprites();
  renderHUD();

  if (player.hp <= 0) gameState = "lose";
  if (enemies.every(e => !e.alive)) gameState = "win";
}

function handleInput() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) player.angle -= player.rotSpeed;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) player.angle += player.rotSpeed;

  let mx = 0, my = 0;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    mx += cos(player.angle) * player.moveSpeed;
    my += sin(player.angle) * player.moveSpeed;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    mx -= cos(player.angle) * player.moveSpeed;
    my -= sin(player.angle) * player.moveSpeed;
  }

  movePlayer(mx, 0);
  movePlayer(0, my);

  shootCooldown = max(0, shootCooldown - 1);
  if (keyIsDown(32) && shootCooldown === 0) {
    shoot();
    shootCooldown = 14;
  }
}

function movePlayer(dx, dy) {
  let nx = player.x + dx;
  let ny = player.y + dy;
  if (!isWall(nx, player.y)) player.x = nx;
  if (!isWall(player.x, ny)) player.y = ny;
}

function isWall(px, py) {
  let gx = floor(px / tileSize);
  let gy = floor(py / tileSize);
  if (!levelMap[gy] || !levelMap[gy][gx]) return true;
  return levelMap[gy][gx] === "1" || levelMap[gy][gx] === "D";
}

function shoot() {
  if (player.ammo <= 0) return;
  player.ammo--;

  let best = null;
  let bestDist = 999999;

  for (let e of enemies) {
    if (!e.alive) continue;
    let dx = e.x - player.x;
    let dy = e.y - player.y;
    let dist = sqrt(dx * dx + dy * dy);
    let ang = normalizeAngle(atan2(dy, dx) - player.angle);
    if (abs(ang) < 0.12 && dist < bestDist && !rayHitsWall(player.x, player.y, e.x, e.y)) {
      best = e;
      bestDist = dist;
    }
  }

  if (best) {
    best.hp--;
    if (best.hp <= 0) best.alive = false;
  }
}

function rayHitsWall(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let steps = ceil(max(abs(dx), abs(dy)) / 8);
  for (let i = 0; i <= steps; i++) {
    let x = x1 + dx * (i / steps);
    let y = y1 + dy * (i / steps);
    if (isWall(x, y)) return true;
  }
  return false;
}

function updateEnemies() {
  for (let e of enemies) {
    if (!e.alive) continue;
    e.cooldown = max(0, e.cooldown - 1);

    let dx = player.x - e.x;
    let dy = player.y - e.y;
    let dist = sqrt(dx * dx + dy * dy);

    if (dist > 20) {
      let step = 0.65;
      let nx = e.x + (dx / dist) * step;
      let ny = e.y + (dy / dist) * step;
      if (!isWall(nx, e.y)) e.x = nx;
      if (!isWall(e.x, ny)) e.y = ny;
    }

    if (dist < 34 && e.cooldown === 0) {
      player.hp -= 8;
      e.cooldown = 45;
      hitFlash = 12;
    }
  }
  hitFlash = max(0, hitFlash - 1);
}

function updateBullets() {
}

function collectPickups() {
  for (let p of pickups) {
    if (p.taken) continue;
    let dx = p.x - player.x;
    let dy = p.y - player.y;
    if (sqrt(dx * dx + dy * dy) < 28) {
      p.taken = true;
      if (p.type === "ammo") player.ammo += 12;
      if (p.type === "health") player.hp = min(100, player.hp + 25);
      if (p.type === "key") player.keys++;
    }
  }
}

function handleDoor() {
  let gx = floor(player.x / tileSize);
  let gy = floor(player.y / tileSize);
  let frontX = floor((player.x + cos(player.angle) * 28) / tileSize);
  let frontY = floor((player.y + sin(player.angle) * 28) / tileSize);

  if (levelMap[frontY] && levelMap[frontY][frontX] === "D" && player.keys > 0) {
    levelMap[frontY] = levelMap[frontY].substring(0, frontX) + "0" + levelMap[frontY].substring(frontX + 1);
    player.keys--;
  }
}

function renderScene() {
  noStroke();
  fill(20);
  rect(0, 0, width, height / 2);
  fill(40);
  rect(0, height / 2, width, height / 2);

  for (let i = 0; i < numRays; i++) {
    let rayAngle = player.angle - fov / 2 + (i / numRays) * fov;
    let dist = castRay(rayAngle);
    dist *= cos(rayAngle - player.angle);
    let wallHeight = (tileSize * 500) / max(1, dist);
    let wallTop = height / 2 - wallHeight / 2;

    let shade = map(dist, 0, depth, 255, 35);
    shade = constrain(shade, 35, 255);

    stroke(shade, shade * 0.45, shade * 0.35);
    line(i, wallTop, i, wallTop + wallHeight);
  }

  if (hitFlash > 0) {
    fill(255, 0, 0, 40);
    rect(0, 0, width, height);
  }
}

function castRay(angle) {
  let sinA = sin(angle);
  let cosA = cos(angle);
  for (let d = 0; d < depth; d += 2) {
    let x = player.x + cosA * d;
    let y = player.y + sinA * d;
    if (isWall(x, y)) return d;
  }
  return depth;
}

function renderSprites() {
  let sprites = [];
  for (let e of enemies) if (e.alive) sprites.push({ x: e.x, y: e.y, type: "enemy" });
  for (let p of pickups) if (!p.taken) sprites.push({ x: p.x, y: p.y, type: p.type });

  sprites.sort((a, b) => dist(b.x, b.y, player.x, player.y) - dist(a.x, a.y, player.x, player.y));

  for (let s of sprites) {
    let dx = s.x - player.x;
    let dy = s.y - player.y;
    let d = sqrt(dx * dx + dy * dy);
    let ang = normalizeAngle(atan2(dy, dx) - player.angle);
    if (abs(ang) > fov / 2) continue;

    let sx = map(ang, -fov / 2, fov / 2, 0, width);
    let size = (tileSize * 260) / max(1, d);

    if (s.type === "enemy") {
      fill(220, 50, 50);
      noStroke();
      rect(sx - size / 2, height / 2 - size / 2, size, size);
      fill(255);
      rect(sx - size / 4, height / 2 - size / 6, size / 6, size / 6);
      rect(sx + size / 8, height / 2 - size / 6, size / 6, size / 6);
    } else if (s.type === "ammo") {
      fill(255, 220, 0);
      noStroke();
      ellipse(sx, height / 2, size * 0.35, size * 0.35);
    } else if (s.type === "health") {
      fill(0, 220, 0);
      noStroke();
      rect(sx - size * 0.15, height / 2 - size * 0.15, size * 0.3, size * 0.3);
      rect(sx - size * 0.05, height / 2 - size * 0.25, size * 0.1, size * 0.5);
    } else if (s.type === "key") {
      fill(200, 150, 0);
      noStroke();
      ellipse(sx, height / 2, size * 0.28, size * 0.28);
      rect(sx, height / 2, size * 0.16, size * 0.05);
    }
  }
}

function renderHUD() {
  fill(255);
  noStroke();
  textSize(14);
  text("WASD / Arrows move. SPACE shoots. Keys open doors.", 12, 20);
  text("HP: " + player.hp + "   Ammo: " + player.ammo + "   Keys: " + player.keys, 12, 40);
  drawMinimap();
}

function drawMinimap() {
  let scale = 0.18;
  let ox = 12;
  let oy = 56;

  for (let y = 0; y < levelMap.length; y++) {
    for (let x = 0; x < levelMap[y].length; x++) {
      let c = levelMap[y][x];
      if (c === "1") fill(120);
      else if (c === "D") fill(120, 80, 0);
      else fill(30);
      rect(ox + x * tileSize * scale, oy + y * tileSize * scale, tileSize * scale, tileSize * scale);
    }
  }

  for (let p of pickups) {
    if (p.taken) continue;
    fill(p.type === "ammo" ? 255 : p.type === "health" ? 0 : 200, p.type === "key" ? 150 : 220, 0);
    ellipse(ox + p.x * scale, oy + p.y * scale, 5, 5);
  }

  for (let e of enemies) {
    if (!e.alive) continue;
    fill(255, 0, 0);
    ellipse(ox + e.x * scale, oy + e.y * scale, 6, 6);
  }

  fill(0, 255, 0);
  ellipse(ox + player.x * scale, oy + player.y * scale, 7, 7);

  stroke(0, 255, 0);
  line(
    ox + player.x * scale,
    oy + player.y * scale,
    ox + (player.x + cos(player.angle) * 30) * scale,
    oy + (player.y + sin(player.angle) * 30) * scale
  );
}

function drawEndScreen() {
  background(0);
  fill(gameState === "win" ? color(0, 255, 0) : color(255, 0, 0));
  textAlign(CENTER, CENTER);
  textSize(40);
  text(gameState === "win" ? "YOU WIN" : "YOU DIED", width / 2, height / 2 - 20);
  textSize(18);
  fill(255);
  text("Refresh to play again", width / 2, height / 2 + 30);
}

function normalizeAngle(a) {
  while (a > PI) a -= TWO_PI;
  while (a < -PI) a += TWO_PI;
  return a;
}