// Padding
var PADDING = 50;

// Maximum speed.
var MAX_VEL = 0.5;

// Define colors
var b1;
var b2;
var yellow;
var violet1;
var violet2;

// Points that move around in space.
var points = [];

var myCanvas;

function setup() {
  myCanvas = createCanvas(window.innerWidth, window.innerHeight);
  myCanvas.parent('hello');

  //createCanvas(800,600);
  //noLoop();
  
  b1 = color(187,98,242);
  b2 = color(132,152,246);
  yellow = color(245,202,117);
  violet1 = color(139,67,180);
  violet2 = color(127,72,222);
  
  
  for (var i = 0; i < 20; i++) {
    points.push({
      x: random(PADDING, width - PADDING),
      y: random(PADDING, height - PADDING),
      vx: random(-MAX_VEL, MAX_VEL),
      vy: random(-MAX_VEL, MAX_VEL),
      color_factor: random(0, 1),
      color_speed: random(-0.01, 0.01),
    });
  }
}

function updatePoints() {
  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    p.x += p.vx;
    p.y += p.vy;
    p.color_factor += p.color_speed;
    
    // Bounce.
    if (p.x < PADDING) {
      p.x = PADDING;
      p.vx *= -1;
    }
    if (p.x > width - PADDING) {
      p.x = width - PADDING;
      p.vx *= -1;
    }
    if (p.y < PADDING) {
      p.y = PADDING;
      p.vy *= -1;
    }
    if (p.y > height - PADDING) {
      p.y = height - PADDING;
      p.vy *= -1;
    }
    if (p.color_factor < 0) {
      p.color_factor = 0;
      p.color_speed *= -1;
    }
    if (p.color_factor > 1) {
      p.color_factor = 1;
      p.color_speed *= -1;
    }
  }
}

function myTriangle(i, j, k) {
  fill(lerpColor(b1, b2, points[i].color_factor));
  triangle(points[i].x, points[i].y, points[j].x, points[j].y, points[k].x, points[k].y);
}

function myRect(i) {
  rect(points[i].x, points[i].y, 50, 50);
}

function myEllipse(i) {
  ellipse(points[i].x, points[i].y, 200, 200);
}

function myLine(i, j) {
  line(points[i].x, points[i].y, points[j].x, points[j].y);
}

function draw() {
  updatePoints();
  
  // Background
  setGradient(0, 0, width, height, b1, b2);
  /*function mouseMoved() {
    setGradient(0, 0, width, height, b1, b2);
  }*/
  //first, static random objects (for now)
  noStroke();
  myTriangle(0, 1, 2);
  myTriangle(1, 2, 3);
  myTriangle(2, 3, 4);
  myTriangle(3, 4, 5);
  myTriangle(4, 5, 6);
  myTriangle(5, 6, 7);
  myTriangle(6, 7, 8);
  myTriangle(7, 8, 9);
  myTriangle(8, 9, 0);
  myTriangle(9, 0, 1);
  

  
  //triangle(200,100,50,300,350,300);
  /*myTriangle(0, 1, 2);
  
  
  fill(violet2);
  myTriangle(2, 3, 4);
  myRect(9);
  myRect(10);
  fill(yellow);
  myRect(11);
  myRect(12);
  noFill();
  stroke(yellow);
  strokeWeight(4);
  myEllipse(13);
  myLine(14, 15);
  myLine(16, 17);*/
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
  }
}

window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  myCanvas.size(w,h);
  width = w;
  height = h;
};