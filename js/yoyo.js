var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('space', 'assets/games/inicio/fondo.png', 138, 15);
    game.load.image('button', 'assets/games/inicio/star2.png', 22, 22);
    game.load.image('logo', 'assets/games/inicio/phaser2.png');
    game.load.audio('intro', 'assets/games/inicio/intro.mp3');
}
var audio;
var boton;
function create() {

    audio=game.add.audio('intro');
    audio.play();

    game.add.tileSprite(0, 0, 800, 600, 'space');
    var sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.alpha = 0;

    //  Create our tween. This will fade the sprite to alpha 1 over the duration of 2 seconds
    var tween = game.add.tween(sprite).to( { alpha: 1 }, 2000, "Linear", true, 0, -1);

    //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
    //  The 3000 tells it to wait for 3 seconds before starting the fade back.
    tween.yoyo(true, 3000);
    button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);

}

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick () {

    background.visible =! background.visible;

}

