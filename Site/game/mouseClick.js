//Possibility to change tower type with mouse click
function changeTower(n) {
  currentTower = n;
}

//Add tower
canvas.addEventListener('mousedown', function () {
  if (towerAllowed(mouse.x, mouse.y)) {
    towers.push(new towerClasses[currentTower](mouse.x, mouse.y));
    money -= towerClasses[currentTower].prototype.cost;
    //Update money when adding tower to the map
    document.getElementById('money').innerHTML = money; 
  }
}, false);

//Function to get the current position of the mouse
function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  mouse = {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
//Add event listener
window.addEventListener('mousemove', getMousePos, false);

//Draws radius around mouse to show potential tower range
function drawMouse() {
  //Needed otherwise if mouse not on canvas returns error when first loading
  if (!mouse) return;
  var range = towerClasses[currentTower].prototype.range;
  context.beginPath();
  //Transperency
  context.globalAlpha = 0.2;
  context.arc(mouse.x, mouse.y, range, 0, 2 * Math.PI);
  //Set color if allowed
  if (towerAllowed(mouse.x, mouse.y)) context.fillStyle = 'black';
  //Set color if not allowed
  else context.fillStyle = 'red';
  context.fill();
  context.globalAlpha = 1;
}

//Function to see if a tower can be built
function towerAllowed(x, y) {
  if (money < towerClasses[currentTower].prototype.cost) return false; 
  if (y < rectWidth * 3) return false;
  else if (y < firstBorder + rectWidth * 2 && x > rightBorder - rectWidth) return false;
  else if (y > firstBorder - rectWidth && y < firstBorder + rectWidth * 2 && x > leftBorder - rectWidth) return false;
  else if (y > firstBorder + rectWidth * 3 && y < secondBorder + rectWidth && x > leftBorder - rectWidth && x < leftBorder + rectWidth * 2) return false;
  else if (y > secondBorder - rectWidth && y < secondBorder + rectWidth * 2 && x > leftBorder + rectWidth * 2) return false;
  else if (y > secondBorder && y < thirdBorder + rectWidth * 2 && x > rightBorder - rectWidth) return false;
  else if (y > thirdBorder - rectWidth && y < thirdBorder + rectWidth * 2) return false;
  else {
    for (var i = 0, j = towers.length; i < j; i++) {
      //Check to see if existing tower is too close
      if (Math.abs(x - towers[i].x) < 2 * rectWidth && Math.abs(towers[i].y - y) < 2 * rectWidth) { return false };
    }
  }
  return true;
}