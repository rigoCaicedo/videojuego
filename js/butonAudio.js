
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('title', 'assets/games/inicio/catastrophi.png');

    game.load.image('button', 'assets/games/inicio/boton1.png', 11, 5);
    game.load.bitmapFont('nokia', 'assets/games/inicio/nokia16black.png', 'assets/games/inicio/nokia16black.xml');
    // game.load.audio('sfx', [ 'assets/audio/SoundEffects/fx_mixdown.mp3', 'assets/audio/SoundEffects/fx_mixdown.ogg' ]);
    game.load.audio('sfx', 'assets/games/inicio/audio/fx_mixdown.ogg');
    game.load.audio('intro', 'assets/games/inicio/intro.mp3');

}

var fx;

function create() {
	var audio=game.add.audio('intro');
    audio.play();

	game.add.image(0, 0, 'title');

	//	Here we set-up our audio sprite
	fx = game.add.audio('sfx');
    fx.allowMultiple = true;

	//	And this defines the markers.

	//	They consist of a key (for replaying), the time the sound starts and the duration, both given in seconds.
	//	You can also set the volume and loop state, although we don't use them in this example (see the docs)

	fx.addMarker('alien death', 1, 1.0);
	fx.addMarker('boss hit', 3, 0.5);
	fx.addMarker('escape', 4, 3.2);
	fx.addMarker('meow', 8, 0.5);
	fx.addMarker('numkey', 9, 0.1);
	fx.addMarker('ping', 10, 1.0);
	fx.addMarker('death', 12, 4.2);
	fx.addMarker('shot', 17, 1.0);
	fx.addMarker('squit', 19, 0.3);

	//	Make some buttons to trigger the sounds
	makeButton('Iniciar', 600, 100);
	/*
	makeButton('boss hit', 600, 180);
	makeButton('escape', 600, 260);
	makeButton('meow', 600, 220);
	makeButton('numkey', 600, 260);
	makeButton('ping', 600, 300);
	makeButton('death', 600, 340);
	makeButton('shot', 600, 380);
	makeButton('squit', 600, 420);*/

}

function makeButton(name, x, y) {

    var button = game.add.button(x, y, 'button', click, this, 0, 1, 2);
    button.name = name;
    button.scale.set(0.3, 0.3);
    button.smoothed = false;

    var text = game.add.bitmapText(x, y + 54, 'nokia', name, 16);
    text.x += (button.width / 2) - (text.textWidth / 2);

}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

function click(button) {

	fx.play(button.name);
	programarAviso();
	

}
function programarAviso(){
    setTimeout(function(){rediret()},3000); // 3000ms = 3s
}

function mostrarAviso(){
    alert("Han pasado los tres segundos");
}
function rediret(){
		//window.location.href = "file:///C:/Users/ADMON/Documents/NetBeansProjects/videojuego/labatalladelosmundos.html"
		window.location.href = "http://caicedo2k18.000webhostapp.com/labatalladelosmundos.html"
		//window.location.href = "file:///C:/Users/Rigo/Documents/NetBeansProjects/actualizado/videojuego/index.html"
		
}