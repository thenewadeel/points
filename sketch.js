// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var font;
var vehicles = [];
var vehicles2 = [];

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  // createCanvas(1024,768);
  createCanvas(windowWidth,windowHeight);
  // fullscreen();
  background(0);
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);

  var points = font.textToPoints('Cyber Warfare', 70, 200, 128, {
    sampleFactor: 0.15
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
  var points = font.textToPoints('83 RC Sigs Bn', 300, 700, 128, {
    sampleFactor: 0.15
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle2 = new Vehicle(pt.x, pt.y);
    vehicles2.push(vehicle2);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}

function draw() {
  background(0);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
  for (var i = 0; i < vehicles2.length; i++) {
    var v = vehicles2[i];
    v.behaviors();
    v.update();
    v.show();
  }
}
