// HWK 5: NBA Narrative Visualization — Next Gen NBA: The Rise of the Under-30 Superstars
// Instance-mode sketch for portfolio tab loader
registerSketch('sk5', function (p) {
  let data = null;
  let padding = 100;
  let hoverPlayer = null;

  p.preload = function () {
    data = p.loadJSON('nba_data_p5.json');
  };

  p.setup = function () {
    p.createCanvas(1000, 900);
    p.textFont('Helvetica');
  };

  p.draw = function () {
    p.background(255);
    if (!data) return;

    let players = data.players;
    let averages = data.averages;

    // --- 1. TITLE AND NARRATIVE ---
    p.textAlign(p.LEFT);
    p.fill(44, 62, 80);
    p.textSize(32);
    p.textStyle(p.BOLD);
    p.text("Next Gen NBA: The Rise of the Under-30 Superstars", padding, 60);

    p.textSize(15);
    p.textStyle(p.NORMAL);
    p.fill(100);
    p.text("Modern NBA stars are reaching peak production earlier than ever. Every highlighted", padding, 85);
    p.text("red dot represents an elite star (Impact 30+) under the age of 30, compared to the league average", padding, 105);

    // --- 2. COORDINATE SCALE ---
    let minAge = 18, maxAge = 42;
    let minImpact = 0, maxImpact = 55;

    const mapX = (v) => p.map(v, minAge, maxAge, padding, p.width - padding);
    const mapY = (v) => p.map(v, minImpact, maxImpact, p.height - padding, padding + 130);

    // --- 3. AXIS LINES ---
    p.stroke(44, 62, 80);
    p.strokeWeight(2);
    p.line(padding, p.height - padding, p.width - padding, p.height - padding);
    p.line(padding, padding + 130, padding, p.height - padding);

    p.noStroke();
    p.fill(44, 62, 80);
    p.textSize(13);
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER);
    p.text("AGE OF PLAYER", p.width / 2, p.height - 40);

    p.push();
    p.translate(40, p.height / 2 + 60);
    p.rotate(-p.HALF_PI);
    p.text("Total Individual Impact (PTS + REB + AST)", 0, 0);
    p.pop();

    // --- 4. LEAGUE AVERAGE LINE ---
    p.noFill();
    p.stroke(180, 180, 180, 150);
    p.strokeWeight(4);
    p.beginShape();
    for (let age in averages) {
      p.vertex(mapX(Number(age)), mapY(averages[age]));
    }
    p.endShape();

    // --- 5. PLAYER DATA & STAGGERED LABELS ---
    hoverPlayer = null;
    let eliteCounter = 0;

    for (let i = 0; i < players.length; i++) {
      let p_ = players[i];
      let x = mapX(p_.age + (p_.offsetX || 0));
      let y = mapY(p_.impact + (p_.offsetY || 0));

      if (p.dist(p.mouseX, p.mouseY, x, y) < 10) {
        hoverPlayer = p_;
      }

      if (p_.highlight) {
        p.fill(231, 76, 60);
        p.noStroke();
        p.ellipse(x, y, 11, 11);

        p.fill(44, 62, 80);
        p.textSize(10);
        p.textStyle(p.BOLD);

        // 8 positions around the dot (spread for readability)
        const labelRadius = 22;
        const pos = eliteCounter % 8;
        const angle = (pos / 8) * p.TWO_PI - p.HALF_PI; // start from top, go clockwise
        const lx = x + labelRadius * p.cos(angle);
        const ly = y + labelRadius * p.sin(angle);
        if (pos < 2) p.textAlign(p.CENTER, p.BOTTOM);      // top
        else if (pos < 4) p.textAlign(p.LEFT, p.CENTER);   // right
        else if (pos < 6) p.textAlign(p.CENTER, p.TOP);    // bottom
        else p.textAlign(p.RIGHT, p.CENTER);                // left
        p.text(p_.name, lx, ly);
        eliteCounter++;
      } else {
        p.fill(220, 220, 220, 120);
        p.noStroke();
        p.ellipse(x, y, 6, 6);
      }
    }

    // --- 6. LEGEND ---
    drawLegend(p.width - 240, 150);

    // --- 7. TOOLTIP ---
    if (hoverPlayer) {
      drawTooltip(p.mouseX, p.mouseY, hoverPlayer);
    }
  };

  function drawLegend(x, y) {
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(12);
    p.textStyle(p.NORMAL);

    p.fill(231, 76, 60);
    p.ellipse(x, y, 10, 10);
    p.fill(80);
    p.text("Elite Stars (Under 30)", x + 15, y);

    p.fill(220);
    p.ellipse(x, y + 25, 8, 8);
    p.fill(80);
    p.text("Role Players / Veterans", x + 15, y + 25);

    p.stroke(180);
    p.strokeWeight(3);
    p.line(x - 5, y + 50, x + 5, y + 50);
    p.noStroke();
    p.fill(80);
    p.text("League Average Impact", x + 15, y + 50);
  }

  function drawTooltip(x, y, pl) {
    let tx = x + 15;
    let ty = y - 75;
    if (tx + 180 > p.width) tx = x - 195;

    p.fill(255, 255, 255, 245);
    p.stroke(44, 62, 80);
    p.strokeWeight(1);
    p.rect(tx, ty, 185, 70, 8);

    p.noStroke();
    p.fill(44, 62, 80);
    p.textAlign(p.LEFT, p.TOP);
    p.textStyle(p.BOLD);
    p.textSize(13);
    p.text(pl.name, tx + 12, ty + 12);

    p.textStyle(p.NORMAL);
    p.textSize(11);
    p.fill(100);
    p.text("Age: " + pl.age + " | Impact: " + pl.impact, tx + 12, ty + 30);
    p.text(pl.pts + " PTS | " + pl.ast + " AST | " + pl.trb + " TRB", tx + 12, ty + 46);
  }
});
