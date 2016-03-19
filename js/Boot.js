// Global object to keep our states and objects
var NTF = {
    
    // Constants
    LOCAL_STORAGE_NAME: "crackalien",
    TILE_SIZE: 80,
    
    // Global variables
    _score: 0,
    _highScore: 0    
};

/**
 * Boot state - loads first
 */
NTF.Boot = function(game) {};
NTF.Boot.prototype = {
    create: function() {
        
        // Scale the canvas accordingly
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
        
        // Get the high score
        NTF._highScore = storageAPI.get(NTF.LOCAL_STORAGE_NAME) == null ?
            0 : storageAPI.get(NTF.LOCAL_STORAGE_NAME);
        
        // Start the game
        this.state.start('Preloader');
    }
};