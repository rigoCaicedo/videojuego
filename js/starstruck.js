
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    
    game.load.tilemap('level1', 'assets/games/starstruck/level12.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles-1', 'assets/games/starstruck/muroshuesos.png');
    game.load.spritesheet('dude', 'assets/games/starstruck/kori.png', 38, 48);
    game.load.spritesheet('enemihuesos', 'assets/games/starstruck/enemihuesos.png', 66, 56);
    game.load.spritesheet('droid', 'assets/games/starstruck/droid.png', 32, 32);
    game.load.image('starSmall', 'assets/games/starstruck/star.png');
    game.load.image('starBig', 'assets/games/starstruck/star2.png');
    game.load.image('background', 'assets/games/starstruck/h.jpg');
    game.load.audio('vallenato', 'assets/games/starstruck/vallenato.mp3');
    game.load.image('star', 'assets/games/starstruck/star.png');
}

var map;
var tileset;
var layer;
var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
var calavera=[];
var bulletTime = 0;
var FireI;
var FireD;
function create() {


//---------------audio--------------------------///

    var audio=game.add.audio('vallenato');
    audio.play();
  
//--------------------fin audio-------------------------//


    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 1200, 600, 'background');
    bg.fixedToCamera = true;

    map = game.add.tilemap('level1');

    map.addTilesetImage('tiles-1');

    map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

    layer = map.createLayer('Tile Layer 1');

    //  Un-comment this on to see the collision tiles
     //layer.debug = true;

    layer.resizeWorld();

    game.physics.arcade.gravity.y = 250;

    player = game.add.sprite(120, 100, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7], 10, true);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    FireI = game.input.keyboard.addKey(Phaser.Keyboard.A);
    FireD = game.input.keyboard.addKey(Phaser.Keyboard.S);

        //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(1, 'star');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);


//-----------------<enemigos>------------------//

    enemigos = game.add.group();
    enemigos.enableBody = true;
    enemigos.physicsBodyType = Phaser.Physics.ARCADE;
    for (var x = 0; x < 30; x++)
        {
            calavera[x] = enemigos.create(game.world.randomX, game.world.randomY,'enemihuesos');
            calavera[x].anchor.setTo(0.5, 0.5);
            calavera[x].body.setSize(20, 32, 5, 16);
            calavera[x].body.moves = true;
            movimientoEnemigo(calavera[x]);


        }

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(enemigos).to( { x: 100 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
    tween.onLoop.add(descend, this);
//------------------</enemigos>-------------------//

}

function movimientoEnemigo(enemigo){

    enemigo.animations.add('leftE', [0, 1, 2, 3,4, 5], 10, true);
            enemigo.body.velocity.x = +100;
            enemigo.animations.play('leftE');
               //facing = 'leftE';
}

function collisionHandler(player, enemigos){
    player.kill();
    enemigos.kill();
}
function muertePlayer(player){
    player.kill();
}
function muerteEnemigo(bullets, enemigos){
    bullets.kill();
    enemigos.kill();
}
function update() {
    bg.tilePosition.y += 1;
    //Colisiones entre elementos del juego
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(enemigos, layer);
    //game.physics.arcade.collide(enemigos, bullets);
    game.physics.arcade.collide(enemigos, enemigos);
    player.body.velocity.x = 0;
    if(player.alive){
        game.physics.arcade.overlap(player, enemigos, muertePlayer, null, this);
        game.physics.arcade.overlap(bullets, enemigos, muerteEnemigo, null, this);
    }
    if (cursors.left.isDown)
    {
    	//fireBulletIzq();
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
    	//fireBulletD();
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');

            facing = 'right';
        }
    }
    else if (cursors.down.isDown)
    {      
      console.log('se pulsa S')
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -350;
        jumpTimer = game.time.now + 850;
    }

     if (FireD.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
    	fireBulletD();
    }

    if (FireI.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
    	fireBulletIzq();
    }

}
function fireBulletD() {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.body.x +16, player.body.y +16);
            bullet.body.velocity.x = +400;
            bulletTime = game.time.now + 200;
        }
    }

}


function fireBulletIzq() {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.body.x +16, player.body.y +16);
            bullet.body.velocity.x = -400;
            bulletTime = game.time.now + 200;
        }
    }

}

function render () {

    game.debug.text(game.time.physicsElapsed, 32, 32);
     game.debug.body(player);
     game.debug.bodyInfo(player, 16, 24);
}
