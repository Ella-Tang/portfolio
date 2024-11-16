let circleAngForward = 0, circleAngBackward = 0;
let ang, sound, amplitude;
let volume = 0;
let fadeInComplete = false;
let userInteracted = false;

function preload() {
  sound = loadSound('sketch/AstralAscension.mp3');
}

function setup() {
  let canvas = createCanvas(windowHeight, windowHeight);
  canvas.parent("sketch-container");

  // Show prompt for interaction
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);

  sound.setVolume(0);
  amplitude = new p5.Amplitude();
}

function draw() {
  ang = map(sin(frameCount * 0.01), -2, 2, 1, TWO_PI);
  let level = amplitude.getLevel();

  // Background color changes based on sound level
  let r = 128 + 60 * sin(ang), g = 128 + 60 * sin(ang + TWO_PI / 3), b = 128 + 60 * sin(ang + TWO_PI / 3 * 2);
  background(r, g, b, 5);
  translate(width / 2, height / 2);

  // Rotating circles
  let radius = map(level, 0, 1, 200, 400) * ang / 6;
  let sz = 20 + 40 * sin(frameCount * 0.06);
  drawCircle(radius, sz, 0.02, circleAngForward, r, g, b, 30);
  drawCircle(radius, sz, 0.005, circleAngForward, r, g, b, 20);
  drawCircle(radius * 3.5, sz * 3.5, -0.02, circleAngBackward, r, g, b, 60);
  drawCircle(radius * 3.5, sz * 3.5, -0.005, circleAngBackward, r, g, b, 20);
  drawCircle(radius * 4, sz * 4, 0.02, circleAngForward, r, g, b, 70);
  drawCircle(radius * 4, sz * 4, 0.005, circleAngForward, r, g, b, 20);

  // Inner fractals
  let n = floor(map(level, 0, 1, 2, 4));
  for (let i = 0; i < n; i++) {
    push();
    rotate(random(-ang, ang));
    stroke(255, 5);
    strokeWeight(80 * ang / 2);
    drawBranch(100 * ang / 4, n);
    pop();
  }
}

function drawCircle(radius, sz, speed, ang, r, g, b, a) {
  noStroke();
  fill(r, g, b, a);
  ellipse(radius * cos(ang), radius * sin(ang), sz);
  speed > 0 ? (circleAngForward += speed) : (circleAngBackward += speed);
}

function drawBranch(len, n) {
  if (len > 20) {
    line(0, 0, 0, -len);
    translate(0, -len);
    for (let i = 0; i < n; i++) {
      push();
      rotate(random(-ang, ang));
      drawBranch(len * random(0.1, 0.3), n);
      pop();
    }
  }
}

function fadeIn() {
  let fadeInterval = setInterval(() => {
    volume += 0.01;
    if (volume >= 0.5) {
      volume = 0.5;
      fadeInComplete = true;
      clearInterval(fadeInterval);
    }
    sound.setVolume(volume);
  }, 50);
}

function fadeOut() {
  let fadeInterval = setInterval(() => {
    volume -= 0.01;
    if (volume <= 0) {
      volume = 0;
      sound.stop();
      clearInterval(fadeInterval); 
    }
    sound.setVolume(volume);
  }, 50);
}

// Start the audio on mouse press
function mousePressed() {
  if (!userInteracted) {
    userStartAudio().then(() => {
      sound.loop();
      fadeIn();
      userInteracted = true;
    });
  }
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
}
