let x, y; 
let bushOffset = 0; 
let fruits = []; 
let sparkle = false;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container"); 
  x = width / 2;
  y = height / 2;
  
  for (let i = 0; i < 20; i++) {
    fruits.push({ x: random(-30, 30), y: random(-20, 20), sparkle: false });
  }
}

function draw() {
  // Background dark to light
  let bgColor = map(mouseY, 0, height, 20, 220);
  background(bgColor);

  //trees
  drawForestBackground();

  // Bushes moving lefy to right
  bushOffset += 1;
  if (bushOffset > width) bushOffset = 0;

  drawGlowingBushes();

  //Jenny
  moveJenny();
  drawJenny();
}

// Draw trees
function drawForestBackground() {
  fill(100, 50, 0); // Brown trunks

  // Tree trunks
  rect(120, 200, 30, 300);
  rect(320, 180, 30, 320);
  rect(520, 220, 30, 280);
  rect(720, 190, 30, 310);
  fill(50, 200, 50);
  ellipse(135, 150, 150, 150);
  ellipse(335, 120, 180, 160);
  ellipse(535, 170, 160, 140);
  ellipse(735, 130, 170, 150);
}

function drawGlowingBushes() {
  fill(40, 150, 50);
  let bushX = [150, 400, 650];

  for (let i = 0; i < bushX.length; i++) {
    let bx = (bushX[i] + bushOffset) % width; // Horizontal
    ellipse(bx, 450, 120, 60); // Bush

    // Fruits
    for (let j = 0; j < fruits.length; j++) {
      let sparkleFactor = sparkle && fruits[j].sparkle ? random(2, 6) : 0;
      fill(255, 200, 0, 200 + sparkleFactor);
      ellipse(bx + fruits[j].x, 450 + fruits[j].y, 10 + sparkleFactor);
    }
  }
}

//Jenny
function drawJenny() {
  x += (mouseX - x) * 0.05;
  y += (mouseY - y) * 0.05;

  // Change bunny color based on mouseX
  let r = map(mouseX, 0, width, 150, 255); // Red component
  let g = map(mouseX, 0, width, 100, 200); // Green component
  let b = map(mouseX, 0, width, 200, 250); // Blue component

  push();
  translate(x, y);

  noStroke();
  fill(r, g, b); // Dynamic bunny color
  ellipse(0, 40, 80, 100); // Body
  ellipse(0, 0, 70, 70); // Head

  //wiggling effect
  let earWiggle = sin(frameCount * 0.1) * 5; 
  fill(r - 30, g - 30, b - 30); 
  ellipse(-20, -40 + earWiggle, 20, 60);
  ellipse(20, -40 - earWiggle, 20, 60);

  // Face
  fill(255);
  ellipse(-10, -5, 20, 20); // Left eye
  ellipse(10, -5, 20, 20); // Right eye
  fill(50);
  ellipse(-10 + map(mouseX, 0, width, -2, 2), -5, 8, 8);
  ellipse(10 + map(mouseX, 0, width, -2, 2), -5, 8, 8);
  fill(255, 150, 150, 200);
  ellipse(0, 5, 10, 5); // mouth
  fill(r - 20, g - 20, b - 20);
  ellipse(-30, 50, 20, 20);

  pop();
}

function moveJenny() {
  x += (mouseX - x) * 0.05;
  y += (mouseY - y) * 0.05;
}

// click on fruitssssss
function mousePressed() {
  sparkle = true;
  for (let i = 0; i < fruits.length; i++) {
    fruits[i].sparkle = random() > 0.5;
  }
}

function mouseReleased() {
  sparkle = false;
}