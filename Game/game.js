import TileMap from './tileMap.js'

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const tileSize = 40;

const tileMap = new TileMap(tileSize);

function gameLoop() {
    tileMap.draw(canvas, context);
}

setInterval(gameLoop, 1000 / 60);