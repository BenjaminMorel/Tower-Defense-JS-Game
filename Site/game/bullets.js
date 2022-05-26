var bullets = [];

function Bullet(x,y,target,hurt) {
  this.x = x,
  this.y = y,
  this.target = target,
  this.hurt = hurt
};

Bullet.prototype.r = rectWidth/4;
Bullet.prototype.speed = baseSpeed*2;

Bullet.prototype.move = function(t) {
  var move = this.speed*t;

  //find unit vector
  var xDist = this.target.x+rectWidth/2-this.x; //"+rectWidth/2" because we want bullet to go for center of enemy no top left corner
  var yDist = this.target.y+rectWidth/2-this.y;
  var dist = Math.sqrt(xDist*xDist+yDist*yDist);

  if(dist < move) {
    this.x = this.target.x+rectWidth/2;
    this.y = this.target.y+rectWidth/2;
  }
  else {
    this.x = this.x+move*xDist/dist;
    this.y = this.y+move*yDist/dist;
  }
};

Bullet.prototype.draw = function() {
  context.beginPath();
  context.arc(this.x,this.y,this.r,0,2*Math.PI);
  context.fillStyle='black';
  context.fill();
};
 
Bullet.prototype.checkCollision = function() {
  if(this.x < this.target.x + rectWidth &&
     this.x + this.r > this.target.x &&
     this.y < this.target.y + rectWidth &&
     this.y + this.r > this.target.y) {
       this.target.life -= this.hurt;
       return true;
     }
  return false;
};