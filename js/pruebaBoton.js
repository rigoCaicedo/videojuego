
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('button', 'assets/games/inicio/star2.png');
    game.load.image('space', 'assets/games/inicio/fondo.png', 138, 15);
    game.load.audio('sonidos','assets/games/inicio/audio/fx_mixdown.ogg');
}

var button;
var background;
var fx;
function create() {

    game.stage.backgroundColor = '#182d3b';

    background = game.add.tileSprite(0, 0, 800, 600, 'space');

    /*button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);
*/
    fx = game.add.audio('sonidos');
    fx.allowMultiple = true;
    fx.addMarker('alien death', 1, 1.0);
    fx.addMarker('boss hit', 3, 0.5);
    fx.addMarker('escape', 4, 3.2);
    fx.addMarker('meow', 8, 0.5);
    fx.addMarker('numkey', 9, 0.1);
    fx.addMarker('ping', 10, 1.0);
    fx.addMarker('death', 12, 4.2);
    fx.addMarker('shot', 17, 1.0);
    fx.addMarker('squit', 19, 0.3);

    //  Make some buttons to trigger the sounds
    makeButton('alien death', 600, 100);
    makeButton('boss hit', 600, 140);
    makeButton('escape', 600, 180);
    makeButton('meow', 600, 220);
    makeButton('numkey', 600, 260);
    makeButton('ping', 600, 300);
    makeButton('death', 600, 340);
    makeButton('shot', 600, 380);
    makeButton('squit', 600, 420);

}

function actionOnClick () {

    background.visible =! background.visible;

}
function makeButton(name, x, y) {

    var button = game.add.button(x, y, 'button', click, this, 0, 1, 2);
    button.name = name;
    button.scale.set(2, 1.5);
    button.smoothed = false;

    var text = game.add.bitmapText(x, y + 7, 'nokia', name, 16);
    text.x += (button.width / 2) - (text.textWidth / 2);

}

function click(button) {

    fx.play(button.name);

}