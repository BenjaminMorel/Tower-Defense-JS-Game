var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  //Game unit size in pixels
  rectWidth = 20, 
  //Maxwidht if not perfect square
  maxWidth = canvas.width, 
  lastMove = new Date(),
  baseSpeed = 5 * rectWidth / 1000,
  //Mouse x and y for drawing range
  mouse, 
  //Current tower type selector.
  currentTower = 0, 

  //Borders for attacker's path
  leftBorder = maxWidth / 6,
  rightBorder = maxWidth * 5 / 6,
  midBorder = maxWidth * 2 / 3;

  //Vertical borders:
  firstBorder = maxWidth / 8,
  secondBorder = maxWidth / 4,
  thirdBorder = maxWidth * 3 / 8,
  //Variable to counter the number of ennemies killed
  ennemiesKilled = 0,
  //Boolean to check if the game is lost
  loose = false,
  //Counter for when to add enemy units
  addEnemyTimer = 2 * 1000,
  //Starting money
  money = 300,
  //Increment for each ennemi killed
  moneyIncrement = 10,
  updateStats = false;

//Adding game music
const music = new Audio("game/Music.mp3");
music.play();
music.volume = 0.1;
music.loop = 1;

//Draw stuff
mainLoopRender = function () {
  if (updateStats) {
    updateStats = false;
    //Set info in HTML file
    document.getElementById('ennemiesKilled').innerHTML = ennemiesKilled;
    document.getElementById('money').innerHTML = money;
  }
  //Draw path
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0, j = enemies.length; i < j; i++) {
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
    //How quicklly a new enemy is generated
    addEnemyTimer = (ennemiesKilled > 40) ? 0.66 * 1000 : 1 * 1000;  
  }

  for (var i = 0, j = enemies.length; i < j; i++) {
    if (enemies[i].move(t)) {
      //If lost, pop an alert window to show the score and enter the name
      let person = prompt("You lost, score: " + ennemiesKilled + "\nPlease enter your name:", "Harry Potter");
      if (person == null || person == "") {
        text = "User cancelled the prompt.";
      } else {
        var nickname = person;
      }

      //Using json to store the info in local storage
      const scores = JSON.parse(localStorage.getItem('highscores')) || [];
      var infos = [ennemiesKilled, nickname];
      scores.push(infos);
      localStorage.setItem('highscores', JSON.stringify(scores));

      //Stop music
      music.pause();

      //Go to leaderboards page
      window.location.replace("/Site/leaderboards.html");

      //Reset counters
      ennemiesKilled = 0;
      nickname = "";
      return;
    }
  }

  for (var i = 0, j = towers.length; i < j; i++) {
    towers[i].findTarget();
    towers[i].findUnitVector();
    towers[i].fire(t);
  }

  //Move bullets, check for hits, remove bullets if hit
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



var gamer = {
  name:nickname,
  score:ennemiesKilled
}