registerSketch('sk4', function (p) {

  let duration = 60; 
  let timeRemaining = duration;
  let running = false;
  let lastUpdate = 0;

  let slider;

  p.setup = function () {
    p.createCanvas(900, 900);
    p.colorMode(p.HSB, 360, 100, 100);
    p.textAlign(p.CENTER, p.CENTER);

    slider = p.createSlider(60, 20 * 60, 60, 30);
    slider.position(350, 780);
    slider.style('width', '200px');

    lastUpdate = p.millis();
  };

  p.draw = function () {
    p.background(0, 0, 95);

    if (!running) {
      duration = slider.value();
      timeRemaining = duration;
    }

    if (running && timeRemaining > 0) {
      let now = p.millis();
      let dt = (now - lastUpdate) / 1000;
      lastUpdate = now;

      timeRemaining -= dt;
      if (timeRemaining < 0) timeRemaining = 0;
    }

    let cx = p.width / 2;
    let cy = p.height / 2;
    let trackW = 650;
    let trackH = 400;

    drawTrack(cx, cy, trackW, trackH);

    let progress = 1 - timeRemaining / duration;
    let angle = progress * 360;
    let runnerPos = pointOnOval(cx, cy, trackW - 60, trackH - 60, angle);

    p.noStroke();
    p.fill(0, 90, 90);
    p.circle(runnerPos.x, runnerPos.y, 25);

    drawUI();
  };

  function drawUI() {
    let t = Math.max(0, timeRemaining);
    let min = Math.floor(t / 60);
    let sec = Math.floor(t % 60);
    let timeStr = p.nf(min, 2) + ":" + p.nf(sec, 2);

    p.fill(0, 0, 20);
    p.textSize(60);
    p.text(timeStr, p.width / 2, 120);

    p.textSize(22);
    p.text("Set Duration (1–20 minutes)", p.width / 2, 750);

    drawButton(300, 830, 140, 50, running ? "Pause" : "Start", () => {
      running = !running;
      lastUpdate = p.millis();
    });

    drawButton(460, 830, 140, 50, "Reset", () => {
      running = false;
      timeRemaining = duration;
    });
  }

  function drawButton(x, y, w, h, label, action) {
    let hover = p.mouseX > x && p.mouseX < x + w && p.mouseY > y && p.mouseY < y + h;

    p.fill(hover ? p.color(200, 30, 90) : p.color(0, 0, 80));
    p.rect(x, y, w, h, 10);

    p.fill(0, 0, 20);
    p.textSize(24);
    p.text(label, x + w / 2, y + h / 2);
  }

  // Clean oval track using ellipses
  function drawTrack(cx, cy, w, h) {
    p.noFill();
    p.stroke(0, 80, 80);
    p.strokeWeight(14);
    p.ellipse(cx, cy, w, h);

    p.stroke(0, 0, 100);
    p.strokeWeight(4);
    p.ellipse(cx, cy, w - 40, h - 40);
    p.ellipse(cx, cy, w - 80, h - 80);
  }

  function pointOnOval(cx, cy, w, h, angle) {
    let x = cx + (w / 2) * p.cos(angle);
    let y = cy + (h / 2) * p.sin(angle);
    return { x, y };
  }

  p.mousePressed = function () {
    if (p.mouseX > 300 && p.mouseX < 440 && p.mouseY > 830 && p.mouseY < 880) {
      running = !running;
      lastUpdate = p.millis();
    }

    if (p.mouseX > 460 && p.mouseX < 600 && p.mouseY > 830 && p.mouseY < 880) {
      running = false;
      timeRemaining = duration;
    }
  };

});
