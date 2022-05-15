import MovingDirection from "./MovingDirection.js";

export default class Monster {

    constructor(x, y, size, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.#loadImages();

        this.movingDirection = 2; //Always start on right
        this.directionTimerDefault = 5;
        this.directionTimer = this.directionTimerDefault;

        this.animationTimerDefault = 5;
        this.animationTimer = null;
    }

    draw(ctx) {
        this.#move();
        this.#changeDirection();
        this.#animate(ctx);
    }

    #animate(ctx) {
        if (this.animationTimer == null) {
            return;
        }
        this.animationTimer--;
        if (this.animationTimer == 0) {
            this.animationTimer = this.animationTimerDefault;
            this.monsterImageIndex++; //Incremente index for images
            if (this.monsterImageIndex == this.monsterImages.length) { //if max size, reset to 0
                this.monsterImageIndex = 0;
            }
        }
        ctx.drawImage(this.monsterImages[this.monsterImageIndex], this.x, this.y, this.size, this.size);
    }

    #move() {
        if (!this.tileMap.didCollideWithEnvironnement(this.x, this.y, this.movingDirection)) {
            if (this.movingDirection != null && this.animationTimer == null) {
                this.animationTimer = this.animationTimerDefault;
            }
            switch(this.movingDirection) {
                case MovingDirection.up:
                    this.y -= this.velocity;
                    break;
                case MovingDirection.down:
                    this.y += this.velocity;
                    break;
                case MovingDirection.left:
                    this.x -= this.velocity;
                    break;
                case MovingDirection.right:
                    this.x += this.velocity;
                    break;
            }
        }
    }

    #changeDirection() {
        this.directionTimer--;
        let newDirection = null;
        if (this.directionTimer == 0) {
            this.directionTimer = this.directionTimerDefault;
            //If last direction was right or left, next one is up or down
            if (this.movingDirection == 2 || this.movingDirection == 3) {
                newDirection = Math.floor(Math.random() * 2);
            }
            //If last direction was down or up, next one is right or left
            if (this.movingDirection == 0 || this.movingDirection == 1) {
                newDirection = Math.floor(Math.random() * 2) + 2;
            }
            //newDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length); //Generate random between 0 and 3 for directions
        }

        //Prevents same movements
        if(newDirection != null && this.movingDirection != newDirection) {
            //Checking the number for movement change is an Integer
            if (Number.isInteger(this.x /this.size) && Number.isInteger(this.y / this.size)) {
                if (!this.tileMap.didCollideWithEnvironnement(this.x, this.y, newDirection)) {
                    this.movingDirection = newDirection;
                }
            }
        }
    }

    //Is used to load different images for animations
    #loadImages() {
        const monsterImage0 = new Image();
        monsterImage0.src = "images/monster0.png"

        const monsterImage1 = new Image();
        monsterImage1.src = "images/monster1.png";

        const monsterImage2 = new Image();
        monsterImage2.src = "images/monster2.png";

        const monsterImage3 = new Image();
        monsterImage3.src = "images/monster3.png";

        const monsterImage4 = new Image();
        monsterImage4.src = "images/monster0.png";

        this.monsterImages = [monsterImage0, monsterImage1, monsterImage2, monsterImage3, monsterImage4];
        this.monsterImageIndex = 0; //index to start in the array
    }
}