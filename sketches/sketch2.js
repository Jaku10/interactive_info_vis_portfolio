// Instance-mode sketch for tab 2 (HWK #4.A)
registerSketch('sk2', function (p) {

  let t = 0;
  let trail;

  // timer state
  let timerDuration = 300;   // default 5 minutes
  let timerRemaining = 300;
  let lastUpdate = 0;
  let running = false;

  // preset buttons
  let buttons = [];

  p.setup = function () {
    p.createCanvas(800, 800);   // fixed size for stability
    p.colorMode(p.HSB, 360, 100, 100);
    p.angleMode(p.DEGREES);
    p.textAlign(p.CENTER, p.CENTER);

    trail = p.createGraphics(800, 800);
    trail.colorMode(p.HSB, 360, 100, 100);
    trail.background(35, 20, 95);

    lastUpdate = p.millis();

    buttons = [
      { label: "1 min", time: 60,   x: 150, y: 720, w: 100, h: 40 },
      { label: "5 min", time: 300,  x: 300, y: 720, w: 100, h: 40 },
      { label: "10 min", time: 600, x: 450, y: 720, w: 100, h: 40 },
      { label: "20 min", time: 1200,x: 600, y: 720, w: 100, h: 40 }
    ];
  };

  p.draw = function () {
    // --- TIMER LOGIC ---
    let now = p.millis();
    if (running && timerRemaining > 0) {
      let delta = (now - lastUpdate) / 1000;
      timerRemaining -= delta;
      timerRemaining = Math.max(0, timerRemaining);
    }
    lastUpdate = now;

    // fade sand slightly
    trail.noStroke();
    trail.fill(35, 20, 95, 0.12);
    trail.rect(0, 0, 800, 800);

    // progress from 0 → 1
    let progress = 1 - (timerRemaining / timerDuration);

    // background sand color
    let sandHue = p.map(progress, 0, 1, 25, 45);
    p.background(sandHue, 20, 95);

    // --- SMOOTH MOTION ---
    let angleSpeed = 4 + progress * 6;
    let radiusSpeed = 0.25 + progress * 0.5;
    let wave = p.sin(t * 0.8) * 8;

    let arms = 6;

    for (let i = 0; i < arms; i++) {
      let offset = (360 / arms) * i;

      let angle = t * angleSpeed + offset + wave;
      let radius = t * radiusSpeed + p.sin(t * 0.4 + i * 20) * 10;

      let x = 400 + radius * p.cos(angle);
      let y = 400 + radius * p.sin(angle);

      trail.stroke(210, 30, 60);
      trail.strokeWeight(2);
      trail.point(x, y);

      p.noStroke();
      p.fill(0, 0, 20);
      p.circle(x, y, 10);
    }

    p.image(trail, 0, 0);

    // --- TIMER DISPLAY ---
    let minutes = Math.floor(timerRemaining / 60);
    let seconds = Math.floor(timerRemaining % 60);
    let timeString = p.nf(minutes, 2) + ":" + p.nf(seconds, 2);

    p.fill(0, 0, 25);
    p.textSize(40);
    p.text(timeString, 400, 40);

    // --- BUTTONS ---
    drawButton(400, 680, 120, 45, running ? "Pause" : "Start");
    drawButton(400, 630, 120, 45, "Reset");

    for (let b of buttons) {
      drawButton(b.x, b.y, b.w, b.h, b.label);
    }

    if (running && timerRemaining > 0) {
      t += 0.015;
    }
  };

  function drawButton(x, y, w, h, label) {
    p.noStroke();
    p.fill(0, 0, 90, 0.8);
    p.rectMode(p.CENTER);
    p.rect(x, y, w, h, 10);

    p.fill(0, 0, 20);
    p.textSize(18);
    p.text(label, x, y + 2);
  }

  p.mousePressed = function () {
    // Start / Pause
    if (inside(p.mouseX, p.mouseY, 400, 680, 120, 45)) {
      running = !running;
    }

    // Reset
    if (inside(p.mouseX, p.mouseY, 400, 630, 120, 45)) {
      timerRemaining = timerDuration;
      t = 0;
      trail.background(35, 20, 95);
      running = false;
    }

    // Presets
    for (let b of buttons) {
      if (inside(p.mouseX, p.mouseY, b.x, b.y, b.w, b.h)) {
        timerDuration = b.time;
        timerRemaining = b.time;
        t = 0;
        trail.background(35, 20, 95);
        running = false;
      }
    }
  };

  function inside(mx, my, x, y, w, h) {
    return mx > x - w/2 && mx < x + w/2 &&
           my > y - h/2 && my < y + h/2;
  }

});

