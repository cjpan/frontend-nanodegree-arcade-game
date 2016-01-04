// Enemies our player must avoid
var Enemy = function() {

    numRows = 6;
    numCols = 5;
    maxSpeed = 1000;
    minSpeed = 100;
    rowHeight = 83;
    colWidth = 101;
    offset = 18;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';


    this.init = function() {
        // random initial x position from -5 cols to 0
        this.x = 0 - Math.floor(Math.random() * 5 * colWidth);
        // random initial y position from row 1 to row 4
        this.y = Math.floor(Math.random() * 3 + 1) * rowHeight - offset;
        // random speed
        this.speed = Math.random(maxSpeed - minSpeed) + minSpeed;
    };

    this.init();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;

    // The enemy reaches the most right position
    // Reset it to the initial state.
    if (this.x / colWidth > numCols - 1) {
        this.init();
    }

    this.checkCollisions(player);
};

Enemy.prototype.checkCollisions = function(object) {
    if ((Math.round(this.x / colWidth) === object.col) && 
        (Math.round(this.y / rowHeight) === object.row)) {
        object.init();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    numRows = 6;
    numCols = 5;
    rowHeight = 83;
    colWidth = 101;
    offset = 18;

    this.sprite = 'images/char-boy.png';

    this.init = function() {
        this.col = 2; // initial col position;
        this.row = 5; // initial row position;
        // moving steps;
        this.moveRow = 0;
        this.moveCol = 0;
    };

    this.init();
};

Player.prototype.update = function() {
    this.row += this.moveRow;
    this.col += this.moveCol;
    this.moveCol = 0;
    this.moveRow = 0;

    // the player reaches the bottom
    if (this.row > 5) {
        this.row = 5;
    }

    // the player reaches the right border
    if (this.col > 4) {
        this.col = 4;
    }

    // the player reaches the left border
    if (this.col < 0) {
        this.col = 0;
    }

    // the player reaches the water border and win
    if (this.row < 1) {
        this.init();
    }
};

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.moveCol = -1;
    }
    if (key === 'up') {
        this.moveRow = -1;
    }
    if (key === 'right') {
        this.moveCol = 1;
    }
    if (key === 'down') {
        this.moveRow = 1;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col * colWidth,
        this.row * rowHeight - offset);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var enemy_1 = new Enemy();
var enemy_2 = new Enemy();
var enemy_3 = new Enemy();
var allEnemies = [enemy_1, enemy_2, enemy_3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
