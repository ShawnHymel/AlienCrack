/**
 * Game over screen
 */
NTF.GameOver = function(game) {};
NTF.GameOver.prototype = {
    
    // Show game over screen
    create: function() {
        NTF._highScore = Math.max(NTF._score, NTF._highScore);
        storageAPI.set(NTF.LOCAL_STORAGE_NAME, NTF._highScore);
        var style = {
            font: "32px Monospace",
            fill: "#00ff00",
            align: "center"
        }
        var text = game.add.text(game.width / 2, game.height / 2,
            "Game Over\n\nYour score: " + NTF._score + 
            "\nBest score: " + NTF._highScore + "\n\nTap to restart", style);
        text.anchor.set(0.5);
        game.input.onDown.add(this.restartGame, this);
    },
    
    // Go back to the title screen
    restartGame: function() {
        game.state.start('Title');
    }
}