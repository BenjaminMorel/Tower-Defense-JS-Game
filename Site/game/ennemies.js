var enemies = [];
//var addedLife = 0; //incremented in checkForDead()

function Enemy(progress) {
  this.progress = progress;
  this.life = this.maxLife;
}

//common to all Emeny objects
Enemy.prototype.maxLife = 1;
Enemy.prototype.speed = baseSpeed;
Enemy.prototype.color = "black";
Enemy.prototype.image = document.getElementById('ennemy0');
Enemy.prototype.image1 = document.getElementById('ennemy1');
Enemy.prototype.image2 = document.getElementById('ennemy2');
Enemy.prototype.image3 = document.getElementById('ennemy3');

var image = new Image();
image.src = "game/images/Monster0.png";
var image1 = new Image();
image1.src = "game/images/Monster1.png";
var image2 = new Image();
image2.src = "game/images/Monster2.png";
var image3 = new Image();
image3.src = "game/images/Monster3.png";
this.monsterImages = [image, image1, image2, image3];
this.monsterImageIndex = 0; //index to start in the array


Enemy.prototype.draw = function () {
  var img = this.constructor.prototype.image;

  this.monsterImageIndex++; //Incremente index for images
  if (this.monsterImageIndex == 3) { //if max size, reset to 0
    this.monsterImageIndex = 0;
  }

  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.angle);
  context.drawImage(monsterImages[monsterImageIndex], -img.width / 2, -img.height / 2);
  context.restore();

  //life bar
  context.fillStyle = 'lightgreen';
  context.fillRect(this.x-10, this.y+15 + rectWidth / 3, rectWidth * this.life / (this.maxLife), rectWidth / 4);
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
      ennemiesKilled++;
      money += moneyIncrement;
      updateStats = true;
      enemies.splice(i, 1);
      i--;
      j--;
    }
  }
}

var addEnemy = function () {
  var enemy;
  //select random enemy type
  //  enemy = new enemyTypes[pick](0);
  //} else {

  //}
  enemy = new Enemy(0);
  enemies.push(enemy);
}


/*faster enemy
var FastEnemy = function(progress) {
  Enemy.call(this,progress);
};
FastEnemy.prototype = Object.create(Enemy.prototype);
FastEnemy.prototype.constructor = FastEnemy;

FastEnemy.prototype.speed = Enemy.prototype.speed*1.4;
FastEnemy.prototype.color = 'DarkRed';

//stronger enemy
var StrongEnemy = function(progress) {
  Enemy.call(this,progress);
};
StrongEnemy.prototype = Object.create(Enemy.prototype);
StrongEnemy.prototype.constructor = StrongEnemy;

StrongEnemy.prototype.color = 'Green';
StrongEnemy.prototype.maxLife = Enemy.prototype.maxLife*2;*/


//list of enemy types
var enemyTypes = [Enemy]; 