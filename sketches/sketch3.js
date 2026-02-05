// Instance-mode sketch for tab 3 (HWK #4.B) - Circular Progress Activity Clock
registerSketch('sk3', function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
    p.colorMode(p.HSB, 360, 100, 100);
    p.angleMode(p.DEGREES);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    p.background(240, 20, 95);
    
    let cx = 400;
    let cy = 400;
    
    // Get current time
    let h = p.hour();
    let m = p.minute();
    let s = p.second();
    
    // Hour progress (0-24 hours)
    let hourProgress = h / 24;
    let hourAngle = hourProgress * 360;
    
    // Minute progress (current hour)
    let minuteProgress = m / 60;
    let minuteAngle = minuteProgress * 360;
    
    // Second progress (current minute)
    let secondProgress = s / 60;
    let secondAngle = secondProgress * 360;
    
    // Outer ring - hours (24-hour cycle)
    p.noFill();
    p.strokeWeight(25);
    p.stroke(200, 30, 50, 0.3);
    p.arc(cx, cy, 700, 700, -90, -90 + hourAngle);
    
    // Calculate color based on hour
    let hourHue = p.map(h, 0, 23, 240, 30);
    p.stroke(hourHue, 70, 80);
    p.arc(cx, cy, 700, 700, -90, -90 + hourAngle);
    
    // Middle ring - minutes (60-minute cycle)
    p.strokeWeight(20);
    p.stroke(180, 20, 60, 0.3);
    p.arc(cx, cy, 550, 550, -90, -90 + minuteAngle);
    
    let minuteHue = p.map(m, 0, 59, 180, 120);
    p.stroke(minuteHue, 60, 70);
    p.arc(cx, cy, 550, 550, -90, -90 + minuteAngle);
    
    // Inner ring - seconds (60-second cycle)
    p.strokeWeight(15);
    p.stroke(120, 20, 70, 0.3);
    p.arc(cx, cy, 400, 400, -90, -90 + secondAngle);
    
    let secondHue = p.map(s, 0, 59, 120, 60);
    p.stroke(secondHue, 80, 80);
    p.arc(cx, cy, 400, 400, -90, -90 + secondAngle);
    
    // Center circle with time
    p.noStroke();
    p.fill(240, 10, 100);
    p.circle(cx, cy, 300);
    
    // Time display
    let timeString = p.nf(h, 2) + ":" + p.nf(m, 2) + ":" + p.nf(s, 2);
    p.fill(240, 30, 20);
    p.textSize(42);
    p.text(timeString, cx, cy - 20);
    
    // Progress percentages
    p.textSize(18);
    p.fill(240, 20, 40);
    p.text("Hour: " + p.nf(hourProgress * 100, 1, 1) + "%", cx, cy + 40);
    p.text("Minute: " + p.nf(minuteProgress * 100, 1, 1) + "%", cx, cy + 65);
    p.text("Second: " + p.nf(secondProgress * 100, 1, 1) + "%", cx, cy + 90);
  };

});
