import Monster from './Monster.js';
import TileMap from './TileMap.js'

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const tileSize = 40;
const velocity = 1; //Set default velocity for monsters
const tileMap = new TileMap(tileSize);

const monsters = tileMap.getMonsters(velocity);
let frame = 0;

setInterval(gameLoop, 1000 / 60); //Set game speed

//Start game
var wave = document.getElementById('wave');
var waveNo = 1;
wave.innerText = "Wave no " + waveNo;

var start = true;

//Redraw the screen
function gameLoop() { 
    tileMap.draw(canvas, context);
    frame++;
    console.log(frame);
    if (start) {
        //if (frame % 100 == 0) {
            monsters.forEach(monster => monster.draw(context)); 
            
        //}
       
        
        //tileMap.spawnMonster();
        
    }
}