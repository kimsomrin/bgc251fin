const { Responsive } = P5Template;

let cam;
let stepSize = 10;
let messages = [
  '당신은, 최고입니다',
  '암어퀸',
  '이거지예',
  '잘하고 있엉^^',
  '오늘도 홧팅',
  '🫶🏻',
  '🤍',
  '🥰',
  '❤️‍🔥',
  '🥳',
  '☺️',
  '오늘만 버티자!!',
];

let floatingTexts = [];

function setup() {
  new Responsive().createResponsiveCanvas(800, 600, 'contain', true);
  cam = createCapture(VIDEO);
  cam.size(96, 72);
  cam.hide();
  colorMode(HSB, 360, 100, 100);
  noStroke();
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  cam.loadPixels();

  push();
  translate(width, 0);
  scale(-1, 1);

  for (let y = 0; y < cam.height; y++) {
    for (let x = 0; x < cam.width; x++) {
      let index = (x + y * cam.width) * 4;
      let r = cam.pixels[index];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let bright = (r + g + b) / 3;
      let size = map(bright, 0, 255, 2, 10);

      let baseHue = 340;
      let hueShift = random(-15, 15);
      let h = (baseHue + hueShift + 360) % 360;
      fill(h, 70, 95);

      drawHeart(x * stepSize, y * stepSize, size);
    }
  }
  pop();

  fill(0, 0, 100);
  textAlign(CENTER, BOTTOM);
  textSize(24);
  text('정신 수련 중입니다🤍', width / 2, height - 20);

  if (frameCount % 10 === 0) {
    let msg = random(messages);
    let x = random(width);
    let y = random(height);
    floatingTexts.push({ msg, x, y, lifetime: 30 });
  }

  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    let t = floatingTexts[i];
    let alpha = map(t.lifetime, 0, 30, 0, 255);
    fill(0, 0, 100, alpha);
    textSize(20);
    text(t.msg, t.x, t.y);
    t.lifetime--;

    if (t.lifetime <= 0) {
      floatingTexts.splice(i, 1);
    }
  }
}

function drawHeart(x, y, s) {
  push();
  translate(x, y);
  beginShape();
  vertex(0, -s * 0.3);
  bezierVertex(s * 0.4, -s * 0.8, s * 1.0, -s * 0.1, 0, s);
  bezierVertex(-s * 1.0, -s * 0.1, -s * 0.4, -s * 0.8, 0, -s * 0.3);
  endShape(CLOSE);
  pop();
}
