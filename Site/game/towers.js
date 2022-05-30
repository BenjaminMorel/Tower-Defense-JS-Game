var towers = []; //List of defense towers

//Range variables
var TOWER_RANGE_MEDIUM = rectWidth * 5;
var TOWER_RANGE_LONG = TOWER_RANGE_MEDIUM * 1.4;
var TOWER_RANGE_SHORT = TOWER_RANGE_MEDIUM * 0.7;

//Rate variables
var TOWER_RATE_MEDIUM = 1.0 * 1000; //smaller means more bullets per second
var TOWER_RATE_HIGH = TOWER_RATE_MEDIUM / 2;

//Damage variables
var TOWER_DAMAGE_MEDIUM = Enemy.prototype.maxLife / 4;
var TOWER_DAMAGE_HIGH = TOWER_DAMAGE_MEDIUM * 1.5;

//Manage strategies
var TOWER_STRATEGY_OLDEST = 1;
var TOWER_STRATEGY_YOUNGEST = 2;
var TOWER_STRATEGY_WEAKEST = 3;
var TOWER_STRATEGY_RANDOM = 4;

Tower.prototype.r = rectWidth; //radius
Tower.prototype.rateOfFire = TOWER_RATE_MEDIUM;
Tower.prototype.range = TOWER_RANGE_MEDIUM;
Tower.prototype.hurt = TOWER_DAMAGE_MEDIUM;
Tower.prototype.image = document.getElementById('cannon1');
Tower.prototype.cost = 50;
Tower.prototype.targetStrategy = TOWER_STRATEGY_OLDEST;

//Basic tower level 1
function Tower(x, y) {
  this.x = x;
  this.y = y;
}
document.getElementById('tower1range').textContent = "normal";
document.getElementById('tower1damage').textContent = "low";
document.getElementById('tower1rate').textContent = "normal";
document.getElementById('tower1cost').textContent = Tower.prototype.cost;

//Tower 2 with long range and rate of fire doubled
var Tower2 = function (x, y) {
  Tower.call(this, x, y);
};
Tower2.prototype = Object.create(Tower.prototype);
Tower2.prototype.constructor = Tower2;
Tower2.prototype.range = TOWER_RANGE_LONG;
Tower2.prototype.image = document.getElementById('cannon2');
Tower2.prototype.cost = Tower.prototype.cost * 3;
Tower2.prototype.rateOfFire = TOWER_RATE_HIGH / 2;
Tower2.prototype.targetStrategy = TOWER_STRATEGY_OLDEST;
document.getElementById('tower2range').textContent = "long"
document.getElementById('tower2damage').textContent = "normal";
document.getElementById('tower2rate').textContent = "high";
document.getElementById('tower2cost').textContent = Tower2.prototype.cost;


//Strong tower 
var Tower3 = function (x, y) {
  Tower.call(this, x, y);
};
Tower3.prototype = Object.create(Tower.prototype);
Tower3.prototype.constructor = Tower3;
Tower3.prototype.range = TOWER_RANGE_SHORT;
Tower3.prototype.hurt = TOWER_DAMAGE_HIGH * 3;
Tower3.prototype.image = document.getElementById('cannon3');
Tower3.prototype.cost = Tower.prototype.cost * 4;
Tower3.prototype.targetStrategy = TOWER_STRATEGY_OLDEST;
document.getElementById('tower3range').textContent = "short";
document.getElementById('tower3damage').textContent = "high";
document.getElementById('tower3rate').textContent = "normal";
document.getElementById('tower3cost').textContent = Tower3.prototype.cost;


//Function to check if an ennemy is in range of the tower
Tower.prototype.enemyIsInRange = function (enemy) {
  var dist = (enemy.x - this.x) * (enemy.x - this.x + rectWidth) + (enemy.y - this.y) * (enemy.y - this.y + rectWidth); //rectWidth included to look at center of rectangle, not top left corner
  return (dist < (this.range * this.range)); //square of range. avoid Math.sqrt which is expensive
};

//Function to select target
Tower.prototype.selectTarget = function (possibleTargets) {
  switch (this.targetStrategy) {
    case TOWER_STRATEGY_OLDEST:
      return possibleTargets[0];
    case TOWER_STRATEGY_YOUNGEST:
      return possibleTargets[possibleTargets.length - 1];
    case TOWER_STRATEGY_WEAKEST:
      return possibleTargets.sort(function (a, b) { return a.life - b.life })[0];
    case TOWER_STRATEGY_RANDOM:
    default:
      return possibleTargets[Math.floor(Math.random() * (possibleTargets.length))];
  }
};

Tower.prototype.findTarget = function () {
  //if no enemies, no target
  if (enemies.length === 0) {
    this.target = null;
    return;
  }

  //if target dead or out of range, remove target reference
  if (this.target && (this.target.life <= 0 || !this.enemyIsInRange(this.target))) {
    this.target = null;
  }

  //keep current target to track it
  if (this.target) {
    return;
  }

  //find all enemies in range
  var possibleTargets = enemies.filter(this.enemyIsInRange, this);

  if (possibleTargets.length > 0) {
    this.target = this.selectTarget(possibleTargets);
  }
};

Tower.prototype.findUnitVector = function () {
  if (!this.target) return false;
  var xDist = this.target.x - this.x;
  var yDist = this.target.y - this.y;
  var dist = Math.sqrt(xDist * xDist + yDist * yDist);
  this.angle = Math.atan2(yDist, xDist) + Math.PI / 2;
  this.xFire = this.x + this.r * xDist / dist;
  this.yFire = this.y + this.r * yDist / dist;
};

Tower.prototype.draw = function () {
  var img = this.constructor.prototype.image;
  if (img) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(img, -img.width / 2, -img.height / 2);
    context.restore();
  } else {
    //draw outer circle
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    //draw turret
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.xFire, this.yFire);
    context.lineWidth = 3;
    context.stroke();
    context.lineWidth = 1;
  }

};

Tower.prototype.fire = function (t) {
  this.rateOfFire -= t;
  if (this.target && this.rateOfFire <= 0) {
    bullets.push(new Bullet(this.xFire, this.yFire, this.target, this.hurt));
    this.rateOfFire = this.constructor.prototype.rateOfFire; //reset
  }
};

var towerClasses = [Tower, Tower2, Tower3]; //List of types of towers