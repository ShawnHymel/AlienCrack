/**
 * Preloader state
 */
NTF.Preloader = function(game) {};
NTF.Preloader.prototype = {
    
    // Preload game assets
    preload: function() {
        
        // Load sprites
        game.load.spritesheet("soundicons", "img/soundicons.png", 80, 80);
        game.load.spritesheet("tiles", "img/tiles.png", NTF.TILE_SIZE, 
            NTF.TILE_SIZE);
            
        // Load audio
        game.load.audio("select", ["sfx/boop.mp3", "sfx/boop.ogg"]);
        game.load.audio("right", ["sfx/bing.mp3", "sfx/bing.ogg"]);
        game.load.audio("wrong", ["sfx/buzz.mp3", "sfx/buzz.ogg"]);
    },
    
    // Go to next state
    create: function() {
        game.state.start('Title');
    }
}