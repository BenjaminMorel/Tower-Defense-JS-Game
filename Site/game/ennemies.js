var enemies = [];
var addedLife = 0; //incremented in checkForDead()
var ennemiesCounter = 0;

function Enemy(progress) {
  this.progress = progress;
  ennemiesCounter = ennemiesCounter + 1;
  //console.log("New ennemy spawned: " + ennemiesCounter);
  this.life = this.maxLife + addedLife;
}

//common to all Emeny objects
Enemy.prototype.maxLife = 1;
Enemy.prototype.speed = baseSpeed;

var ennemy = new Image();
ennemy.src = "game/images/Monster.png";

var boss = new Image();
boss.src = "game/images/Boss.png";

var frog = new Image();
frog.src = "game/images/Frog.png";

Enemy.prototype.draw = function () {
  context.save();
  context.translate(this.x, this.y+5);
  context.drawImage(ennemy, -ennemy.width / 2, -ennemy.height / 2);
  context.restore();
  //life bar
  context.fillStyle = 'lightgreen';
  context.fillRect(this.x - 10, this.y + 15 + rectWidth / 3, rectWidth * this.life / (this.maxLife + addedLife), rectWidth / 4);
};

Enemy.prototype.progressTable = [
  rightBorder,
  firstBorder - rectWidth,
  rightBorder - leftBorder,
  secondBorder - firstBorder,
  rightBorder - leftBorder,
  thirdBorder - secondBorder,
  rightBorder
];

Enemy.prototype.setPosition = function () {
  var p = 0, i = 0;
  for (var j = this.progressTable.length; i < j; i++) {
    if (this.progress < this.progressTable[i] + p) {
      break;
    }
    p += this.progressTable[i];
  }

  var p2 = this.progress - p;

  switch (i) {
    case 0:
      this.x = p2;
      this.y = 0 + rectWidth;
      break;
    case 1:
      this.x = rightBorder;
      this.y = p2 + rectWidth;
      break;
    case 2:
      this.x = rightBorder - p2;
      this.y = firstBorder;
      break;
    case 3:
      this.x = leftBorder;
      this.y = firstBorder + p2;
      break;
    case 4:
      this.x = leftBorder + p2;
      this.y = secondBorder;
      break;
    case 5:
      this.x = rightBorder;
      this.y = secondBorder + p2;
      break;
    case 6:
      this.x = rightBorder - p2;
      this.y = thirdBorder;
      break;
    case 7:
    default:
      return true; //returns true so enemy can be removed in another function
  }
  return false;
}

Enemy.prototype.move = function (t) {
  this.progress += this.speed * t;
  return this.setPosition();
};

function checkForDead() {
  for (var i = 0, j = enemies.length; i < j; i++) {
    if (enemies[i].life <= 0) {
      addedLife = Math.floor(ennemiesKilled / 10) * (1 + Math.floor(ennemiesKilled / 100)); //used to make enemies tougher as the number of stopped enemies goes up
      console.log(addedLife);
      ennemiesKilled++;
      money += moneyIncrement;
      updateStats = true;
      enemies.splice(i, 1); //kill and remove ennemy
      i--;
      j--;
    }
  }
}

var addEnemy = function () {
  var enemy;
  if (ennemiesCounter > 10 && ennemiesCounter % 3 == 0) {
    enemy = new enemyTypes[2](0);//select random enemy type
  }
  else if (ennemiesCounter > 1 && ennemiesCounter % 10 == 0) {
    enemy = new enemyTypes[1](0);//select random enemy type
  }
  else {
    enemy = new Enemy(0);
  }
  enemies.push(enemy);
}


//Faster enemy
var FastEnemy = function (progress) {
  Enemy.call(this, progress);
};
FastEnemy.prototype = Object.create(Enemy.prototype);
FastEnemy.prototype.constructor = FastEnemy;
FastEnemy.prototype.speed = Enemy.prototype.speed * 1.5;
FastEnemy.prototype.maxLife = Enemy.prototype.maxLife / 4;
FastEnemy.prototype.draw = function () {
  context.save();
  context.translate(this.x, this.y+8);
  context.drawImage(frog, -frog.width / 2, -frog.height / 2);
  context.restore();
  //life bar
  context.fillStyle = 'lightgreen';
  context.fillRect(this.x - 10, this.y + 15 + rectWidth / 3, rectWidth * this.life / (this.maxLife + addedLife), rectWidth / 4);
}

//Stronger enemy
var StrongEnemy = function (progress) {
  Enemy.call(this, progress);
};
StrongEnemy.prototype = Object.create(Enemy.prototype);
StrongEnemy.prototype.constructor = StrongEnemy;
StrongEnemy.prototype.maxLife = Enemy.prototype.maxLife * 2;
StrongEnemy.prototype.speed = Enemy.prototype.speed / 2;
StrongEnemy.prototype.draw = function () {
  context.save();
  context.translate(this.x, this.y-2);
  context.drawImage(boss, -boss.width / 2, -boss.height / 2);
  context.restore();
  //life bar
  context.fillStyle = 'lightgreen';
  context.fillRect(this.x - 10, this.y + 15 + rectWidth / 3, rectWidth * this.life / (this.maxLife + addedLife), rectWidth / 4);
}

//list of enemy types
var enemyTypes = [Enemy, StrongEnemy, FastEnemy]; 