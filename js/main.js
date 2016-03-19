// Add Phaser game to div
var game = new Phaser.Game(500, 500, Phaser.CANVAS);
var states = {
    'Boot': NTF.Boot,
    'Preloader': NTF.Preloader,
    'Title': NTF.Title,
    'Game': NTF.Game,
    'GameOver': NTF.GameOver
};

// Add states
for ( var state in states ) {
    game.state.add(state, states[state]);
}

// Start first state
game.state.start('Boot');