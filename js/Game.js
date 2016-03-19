/**
 * Main game state
 */
NTF.Game = function(game) {};
NTF.Game.prototype = {
    
    // Game members
    scoreText: null,
    soundText: null,
    soundArray: [],
    
    // Preload assets
    preload: function () {
        
        // Define game variables
        this._numRows = 4;
        this._numCols = 5;
        this._tileSpacing = 10;
        this._tilesArray = [];
        this._selectedArray = [];
        this._timeLeft;
        this._tilesLeft;
        this._clickable = true;
        
        // Reset score
        NTF._score = 0;
    },
        
    // Set up game board
    create: function () {
        this._score = 0;
        this._timeLeft = 60;
        this.placeTiles();
        if (NTF._playSound) {
            this.soundArray[0] = game.add.audio("select", 1);
            this.soundArray[1] = game.add.audio("right", 1);
            this.soundArray[2] = game.add.audio("wrong", 1);
        }
        var style = {
            font: "32px Monospace",
            fill: "#00ff00",
            align: "center"
        }
        this.scoreText = game.add.text(5, 5, "Score: " + NTF._score, style);
        this.timeText = game.add.text(5, game.height - 5, "Time left: " + 
            this._timeLeft, style);
        this.timeText.anchor.set(0, 1);
        game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
    },
    
    // Update
    update: function () {
    },
    
    // Place the tiles
    placeTiles: function () {
        
        // Set tiles left to max
        this._tilesLeft = this._numRows * this._numCols;
        
        // Define the white space around the tiles
        var leftSpace = (game.width - (this._numCols * NTF.TILE_SIZE) - 
            ((this._numCols - 1) * this._tileSpacing)) / 2;
        var topSpace = (game.height - (this._numRows * NTF.TILE_SIZE) - 
            ((this._numRows - 1) * this._tileSpacing)) / 2;
            
        // Populate the tiles array with the tile IDs
        for (var i = 0; i < (this._numRows * this._numCols); i++) {
            this._tilesArray.push(Math.floor(i / 2));
        }
        
        // Randomize the array storing the tiles
        for (i = 0; i < (this._numRows * this._numCols); i++) {
            var from = game.rnd.between(0, this._tilesArray.length - 1);
            var to = game.rnd.between(0, this._tilesArray.length - 1);
            var temp = this._tilesArray[from];
            this._tilesArray[from] = this._tilesArray[to];
            this._tilesArray[to] = temp;
        }
        
        // Place tiles on screen
        for (i = 0; i < this._numCols; i++) {
            for (var j = 0; j < this._numRows; j++) {
                var tile = game.add.button(leftSpace + i * (NTF.TILE_SIZE + 
                    this._tileSpacing), topSpace + j * (NTF.TILE_SIZE + 
                    this._tileSpacing), "tiles", this.showTile, this);
                tile.frame = 10;
                tile.value = this._tilesArray[(j * this._numCols) + i];
            }
        }
    },
    
    // What happens when we click on a tile
    showTile: function (target) {
        
        // Prevent flipping tiles if we are waiting for the previous 2
        if (!this._clickable) {
            return;
        }
        
        // Uncover up to two tiles
        if ((this._selectedArray.length < 2) && 
            (this._selectedArray.indexOf(target) == -1)) {
            if (NTF._playSound) {
                this.soundArray[0].play();
            }
            target.frame = target.value;
            this._selectedArray.push(target);
        }
        
        // On 2 tiles, leave them flipped then check for match
        if (this._selectedArray.length == 2) {
            this._clickable = false;
            game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, 
                this);
        }
    },
    
    // Remove tiles if match or cover them back up
    checkTiles: function () {
        if (this._selectedArray[0].value == this._selectedArray[1].value) {
            if (NTF._playSound) {
                this.soundArray[1].play();
            }
            NTF._score++;
            this._timeLeft += 2;
            this.timeText.text = "Time left: " + this._timeLeft;
            this.scoreText.text = "Score: " + NTF._score;
            this._selectedArray[0].destroy();
            this._selectedArray[1].destroy();
            this._tilesLeft -= 2;
            if (this._tilesLeft <= 0) {
                this._tilesArray.length = 0;
                this._selectedArray.length = 0;
                this.placeTiles();
            }
        } else {
            if (NTF._playSound) {
                this.soundArray[2].play();
            }
            this._selectedArray[0].frame = 10;
            this._selectedArray[1].frame = 10;
        }
        this._selectedArray.length = 0;
        this._clickable = true;
    },
    
    // Decrease 1 from the timer
    decreaseTime: function() {
        this._timeLeft--;
        this.timeText.text = "Time left: " + this._timeLeft;
        if (this._timeLeft <= 0) {
            game.state.start('GameOver');
        }
    }
};