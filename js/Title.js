/**
 * Title screen state
 */
NTF.Title = function(game) {};
NTF.Title.prototype = {
    
    // Create
    create: function() {
        
        // Define game variables
        game._playSound = false;
        
        // Prevent game from pausing when window focus is away
        game.stage.disableVisibilityChange = true;
        
        // Set title
        var style = {
            font: "48px Monospace",
            fill: "#00ff00",
            align: "center"
        };
        var text = game.add.text(game.width / 2, game.height / 2 - 100,
            "Crack Alien Code", style);
        text.anchor.set(0.5);
        
        // Add sound icons
        var soundButton = game.add.button(game.width / 2 - 100,
            game.height / 2 + 100, "soundicons", this.startGame, this);
        soundButton.anchor.set(0.5);
        soundButton = game.add.button(game.width / 2 + 100, 
            game.height / 2 + 100, "soundicons", this.startGame, this);
        soundButton.frame = 1;
        soundButton.anchor.set(0.5);
    },
    
    // Begin gameplay
    startGame: function(target) {
        if ( target.frame == 0 ) {
            NTF._playSound = true;
        } else {
            NTF._playSound = false;
        }
        game.state.start('Game');
    }
}