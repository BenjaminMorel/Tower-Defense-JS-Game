var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  rectWidth = 20, //basic game unit size (pixles)
  maxWidth = canvas.width, //add maxHight if not perfect square
  lastMove = new Date(),
  baseSpeed = 5 * rectWidth / 1000,
  mouse, //mouse x and y for drawing range
  currentTower = 0, //tower type selector.
  //borders for attacker's path
  leftBorder = maxWidth / 6,
  rightBorder = maxWidth * 5 / 6,
  midBorder = maxWidth * 2 / 3;
  //vertical borders:
  firstBorder = maxWidth / 8,
  secondBorder = maxWidth / 4,
  thirdBorder = maxWidth * 3 / 8,
  ennemiesKilled = 0,
  loose = false,
  //counter for when to add enemy units
  addEnemyTimer = 2 * 1000,
  money = 300,
  moneyIncrement = 10,
  updateStats = false;

//draw stuff
mainLoopRender = function () {
  if (updateStats) {
    updateStats = false;
    document.getElementById('ennemiesKilled').innerHTML = ennemiesKilled;
    document.getElementById('money').innerHTML = money;
  }

  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0, j = enemies.length; i < j; i++) {
    enemies[i].draw();
  }
  for (var i = 0, j = towers.length; i < j; i++) {
    towers[i].draw();
  }
  for (var i = 0, j = bullets.length; i < j; i++) {
    bullets[i].draw();
  }
  drawMouse(); //potential gun radius
  requestAnimationFrame(mainLoopRender);
};

mainLoopLogic = function () {
  var t = new Date() - lastMove;
  checkForDead();
  addEnemyTimer -= t;
  if (addEnemyTimer <= 0) {
    addEnemy()
    addEnemyTimer = (ennemiesKilled > 40) ? 0.66 * 1000 : 1 * 1000;  //how quicklly a new enemy is generated
  }

  for (var i = 0, j = enemies.length; i < j; i++) {
    //true if attacker scored
    if (enemies[i].move(t)) {
      alert("You lost, score: " + ennemiesKilled);

      const scores = JSON.parse(localStorage.getItem('highscores')) || [];

      scores.push(ennemiesKilled);

      // sort from low to high
      scores.sort();

      if (scores.length > 10) {
        scores.shift();
      }

      localStorage.setItem('highscores', JSON.stringify(scores));
      // refresh the page
      window.location.replace("/Site/leaderboards.html");
      ennemiesKilled = 0;
      return;
    }
  }

  for (var i = 0, j = towers.length; i < j; i++) {
    towers[i].findTarget();
    towers[i].findUnitVector();
    towers[i].fire(t);
  }

  //move bullets, check for hits, remove bullets if hit
  for (var i = 0, j = bullets.length; i < j; i++) {
    bullets[i].move(t);
    if (bullets[i].checkCollision()) {
      bullets.splice(i, 1);
      j--;
      i--;
    }
  }
  lastMove = new Date();
  requestIdleCallback(mainLoopLogic, { timeout: 250 });
};

window.onload = function () {
  requestIdleCallback(mainLoopLogic, { timeout: 250 });
  requestAnimationFrame(mainLoopRender);
};
