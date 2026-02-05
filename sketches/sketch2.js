// Instance-mode sketch for tab 2 (HWK #4.A) - Minimalist Digital-Analog Hybrid Clock
registerSketch('sk2', function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
    p.colorMode(p.HSB, 360, 100, 100);
    p.angleMode(p.DEGREES);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    p.background(220, 10, 98);
    
    let cx = 400;
    let cy = 400;
    let radius = 300;
    
    // Get current time
    let h = p.hour() % 12;
    let m = p.minute();
    let s = p.second();
    
    // Digital time display
    let timeString = p.nf(p.hour(), 2) + ":" + p.nf(m, 2) + ":" + p.nf(s, 2);
    
    p.fill(220, 30, 30);
    p.textSize(48);
    p.text(timeString, cx, cy - 200);
    
    // Analog circle background
    p.noFill();
    p.stroke(220, 20, 60);
    p.strokeWeight(3);
    p.circle(cx, cy, radius * 2);
    
    // Hour markers
    p.stroke(220, 30, 40);
    p.strokeWeight(2);
    for (let i = 0; i < 12; i++) {
      let angle = i * 30 - 90;
      let x1 = cx + (radius - 20) * p.cos(angle);
      let y1 = cy + (radius - 20) * p.sin(angle);
      let x2 = cx + radius * p.cos(angle);
      let y2 = cy + radius * p.sin(angle);
      p.line(x1, y1, x2, y2);
    }
    
    // Minute markers
    p.stroke(220, 15, 50);
    p.strokeWeight(1);
    for (let i = 0; i < 60; i++) {
      if (i % 5 !== 0) {
        let angle = i * 6 - 90;
        let x1 = cx + (radius - 10) * p.cos(angle);
        let y1 = cy + (radius - 10) * p.sin(angle);
        let x2 = cx + radius * p.cos(angle);
        let y2 = cy + radius * p.sin(angle);
        p.line(x1, y1, x2, y2);
      }
    }
    
    // Hour hand
    let hourAngle = (h * 30 + m * 0.5) - 90;
    p.stroke(220, 50, 40);
    p.strokeWeight(8);
    p.line(cx, cy, cx + (radius * 0.5) * p.cos(hourAngle), cy + (radius * 0.5) * p.sin(hourAngle));
    
    // Minute hand
    let minuteAngle = (m * 6 + s * 0.1) - 90;
    p.stroke(220, 60, 50);
    p.strokeWeight(5);
    p.line(cx, cy, cx + (radius * 0.75) * p.cos(minuteAngle), cy + (radius * 0.75) * p.sin(minuteAngle));
    
    // Second hand
    let secondAngle = (s * 6) - 90;
    p.stroke(0, 80, 70);
    p.strokeWeight(2);
    p.line(cx, cy, cx + (radius * 0.85) * p.cos(secondAngle), cy + (radius * 0.85) * p.sin(secondAngle));
    
    // Center dot
    p.noStroke();
    p.fill(220, 40, 30);
    p.circle(cx, cy, 12);
    
    // Date display
    let date = new Date();
    let dateString = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    p.fill(220, 25, 35);
    p.textSize(20);
    p.text(dateString, cx, cy + 250);
  };

});
