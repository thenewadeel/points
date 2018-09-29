// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

function Vehicle(x, y) {
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 4;
  this.maxspeed = 270;
  this.maxforce = 1;
  this.temp = 0.1;
}

Vehicle.prototype.behaviors = function () {
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);
  this.temp=this.thermal();
  // this.explode()

  arrive.mult(1);
  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);
}

Vehicle.prototype.applyForce = function (f) {
  // console.log(f.mag())

  this.acc.add(f);
}

Vehicle.prototype.update = function () {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Vehicle.prototype.show = function () {
  var spec = this.vel;
  var r = spec.x * 255;
  var g = spec.y * 255;
  var b = (spec.y / spec.x) * 255;
  // var r= map(this.vel.normalize().x,-1,1,0,255);
  // var g= map(this.vel.normalize().y,-1,1,0,255);
  // stroke(this.temp*r, g, b);
  stroke(55+this.temp,180,230/(this.temp+10));
  strokeWeight(this.r);
  point(this.pos.x, this.pos.y);
  // text(floor(this.temp),5,this.pos.y);
}


Vehicle.prototype.arrive = function (target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  this.temp+=d;
  var speed = this.maxspeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Vehicle.prototype.flee = function (target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}
Vehicle.prototype.thermal = function () {
  // var desired = p5.Vector.sub(target, this.pos);
  // var d = desired.mag();
  // console.log(this.temp);
  var cooling=1;
  // this.temp+=this.vel.x*10000;

  if (this.temp <1) {
    this.temp=5;
  } else if (this.temp > 255) {
    this.temp=255;
  }else{
  }
  return this.temp-cooling;
}
Vehicle.prototype.explode = function () {
  // var desired = p5.Vector.sub(target, this.pos);
  // var d = desired.mag();
  // console.log(this.temp);
  var cooling=1;
  // this.temp+=this.vel.x*10000;

  if (this.temp <1&&random(10)<4) {
    this.acc=p5.Vector.random2D().mult(35);
  } 
}
