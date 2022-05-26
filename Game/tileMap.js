import Monster from "./Monster.js"
import MovingDirection from "./MovingDirection.js"

export default class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize;
        this.tile = this.#image("tile.png");
        this.path = this.#image("path.png");
        this.bird = this.#image("bird.png");
        this.monsterEnnemy = this.#image("monster0.png");
    }

    #image(fileName) {
        const img = new Image();
        img.src = `images/${fileName}`;
        return img;
    }

    //Map path
    map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    /*map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    spawnMonster(velocity) {
        this.map[row][col] = 1; //set background with a path 
        monsters.push(new Monster(col * this.tileSize, row * this.tileSize, this.tileSize, velocity, this)); //create new monster with x and y position
        return monsters;
    }*/

    getMonsters(velocity) {
        const monsters = [];
        let tiles = [];

        for(let row = 0; row < this.map.length; row++) {
            for(let col = 0; col < this.map[0].length; col++) {
                const tile = this.map[row][col];
                //const spawnEnnemy = this.map[8][0] = 2;
                if(this.map[8][2] == 2){
                    this.spawnMonster(velocity);
                }

                if (tile == 2) {
                    monsters.push(new Monster(col * this.tileSize, row * this.tileSize, this.tileSize, velocity, this)); //create new monster with x and y position
                    this.map[row][col] = 1; //set background with a path 
                }
            }
        }
        return monsters;
    }

    draw(canvas, ctx) {
        this.#setCanvasSize(canvas);
        this.#clearCanvas(canvas, ctx);
        this.#drawMap(ctx);
    }

    #drawMap(ctx) {
        for (let row = 0; row < this.map.length; row++) {
            for (let col = 0; col < this.map[row].length; col++) {
                const tile = this.map[row][col];
                let image = null;
                switch (tile) {
                    case 0: image = this.tile;
                        break;
                    case 1: image = this.path;
                        break;
                    case 2: image = this.monster;
                        break;
                    case 3: image = this.bird;
                        break;
                }

                /*Borders on tiles
                ctx.strokeStyle = "red";
                ctx.strokeRect(
                    col*this.tileSize,
                    row*this.tileSize,
                    this.tileSize,
                    this.tileSize
                );*/

                if (image != null)
                    ctx.drawImage(image, col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }

    #clearCanvas(canvas, ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    #setCanvasSize(canvas) {
        canvas.height = this.map.length * this.tileSize;
        canvas.width = this.map[0].length * this.tileSize;
    }

    didCollideWithEnvironnement(x,y,direction) {
        if (
            Number.isInteger(x / this.tileSize) && 
            Number.isInteger(y / this.tileSize)
        ) {
            let col = 0;
            let row = 0;
            let nextCol = 0;
            let nextRow = 0;

            switch(direction) {
                case MovingDirection.right:
                    nextCol = x + this.tileSize;
                    col = nextCol / this.tileSize;
                    row = y / this.tileSize;
                    break;
                
                case MovingDirection.left:
                    nextCol = x - this.tileSize;
                    col = nextCol / this.tileSize;
                    row = y / this.tileSize;
                    break;

                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    col = x / this.tileSize;
                    break;

                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    col = x / this.tileSize;
                    break;
            }

            const tile = this.map[row][col];
            if (tile == 0) { //If collision
                return true;
            }
        }
        return false;
    }
}
