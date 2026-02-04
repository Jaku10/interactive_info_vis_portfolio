// Instance-mode sketch for tab 3 (HWK #4.B)
registerSketch('sk3', function (p) {

  let dragging = false;
  let sunAngle = 0; // angle controlled by user

  p.setup = function () {
    p.createCanvas(800, 800);
    p.colorMode(p.HSB, 360, 100, 100);
    p.angleMode(p.DEGREES);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    // Convert sun angle to time
    let totalMinutes = p.map(sunAngle, 0, 360, 0, 1440);
    let hr = Math.floor(totalMinutes / 60) % 24;
    let mn = Math.floor(totalMinutes % 60);
    let sc = 0;

    // Sky color based on time
    let skyHue = p.map(hr, 0, 23, 220, 40);
    let skyBright = p.map(hr, 0, 23, 20, 100);
    p.background(skyHue, 40, skyBright);

    // Ground circle
    p.noStroke();
    p.fill(35, 20, 80);
    p.circle(400, 400, 500);

    // ---------------------------
    // ROMAN NUMERAL HOUR LABELS
    // ---------------------------
    p.fill(0, 0, 20);
    p.textSize(26);
    p.textAlign(p.CENTER, p.CENTER);

    let numerals = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

    for (let i = 0; i < 12; i++) {
      let angle = i * 30 - 90; // 12 at top
      let r = 240; // radius for labels

      let x = 400 + r * p.cos(angle);
      let y = 400 + r * p.sin(angle);

      p.text(numerals[i], x, y);
    }

    // Gnomon
    p.stroke(0, 0, 20);
    p.strokeWeight(8);
    p.line(400, 400, 400, 250);

    // Shadow (opposite the sun)
    let shadowLength = 220;
    let shadowX = 400 + shadowLength * p.cos(sunAngle - 90);
    let shadowY = 400 + shadowLength * p.sin(sunAngle - 90);

    p.stroke(0, 0, 15, 0.7);
    p.strokeWeight(6);
    p.line(400, 400, shadowX, shadowY);

    // Sun position
    let sunX = 400 + 300 * p.cos(sunAngle - 90);
    let sunY = 400 + 300 * p.sin(sunAngle - 90);

    p.noStroke();
    p.fill(50, 80, 100);
    p.circle(sunX, sunY, 40);

    // Time label
    let timeString =
      p.nf(hr, 2) + ":" +
      p.nf(mn, 2) + ":" +
      p.nf(sc, 2);

    p.fill(0, 0, 20);
    p.textSize(32);
    p.text(timeString, 400, 50);

    // Title
    p.textSize(26);
    p.text("Interactive Sundial Clock", 400, 760);
  };

  // Drag the sun to change time
  p.mousePressed = function () {
    let dx = p.mouseX - 400;
    let dy = p.mouseY - 400;
    let distFromCenter = p.sqrt(dx * dx + dy * dy);

    // Only allow dragging if clicking near the sun
    if (distFromCenter > 260 && distFromCenter < 340) {
      dragging = true;
    }
  };

  p.mouseDragged = function () {
    if (dragging) {
      let dx = p.mouseX - 400;
      let dy = p.mouseY - 400;
      sunAngle = (p.atan2(dy, dx) + 90 + 360) % 360;
    }
  };

  p.mouseReleased = function () {
    dragging = false;
  };

});

