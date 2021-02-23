/* eslint-disable no-unused-vars */
import Enemy from 'GameObject/Npc/Enemy';
import Player1 from 'GameObject/Player1';
import Phaser from 'phaser';

class GameScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'GameScene' });
    }

    preload()
    {
        // Atlas
        this.load.atlas('player1-atlas', '/game/assets/atlas/player1.png', '/game/assets/atlas/player1.json');
        this.load.atlas('guns-and-shots-atlas', '/game/assets/atlas/guns-and-shots.png', '/game/assets/atlas/guns-and-shots.json');
        this.load.atlas('enemies-atlas', '/game/assets/atlas/enemies.png', '/game/assets/atlas/enemies.json');
        this.load.atlas('props-atlas', '/game/assets/atlas/props.png', '/game/assets/atlas/props.json');
        
        // Background
        this.load.image('bg-1', '/game/assets/background/bg-1.png');
        this.load.image('bg-2', '/game/assets/background/bg-2.png');
        this.load.image('bg-3', '/game/assets/background/bg-3.png');

        // Tilemap
        this.load.image('tiles/tileset', '/game/assets/tiles/tileset.png');
        this.load.tilemapTiledJSON('tilemap', '/game/assets/tiles/map.json');
    }

    _createBackgrounds()
    {
        const gameWidth = this.game.scale.width * 4;
        const gameHeight = 224;
        this.bg1 = this.add.tileSprite(0, this.game.scale.height / 2, gameWidth, gameHeight, 'bg-1').setDepth(-1);
        this.bg2 = this.add.tileSprite(0, this.game.scale.height / 2, gameWidth, gameHeight, 'bg-2').setDepth(-1);
        this.bg3 = this.add.tileSprite(0, this.game.scale.height / 2, gameWidth, gameHeight, 'bg-3').setDepth(-1);

        let scaleX = this.cameras.main.width / this.bg1.width;
        let scaleY = this.cameras.main.height / this.bg1.height;
        let scale = Math.max(scaleX, scaleY);
        this.bg1.setScale(scale).setScrollFactor(0);
        scaleX = this.cameras.main.width / this.bg2.width;
        scaleY = this.cameras.main.height / this.bg2.height;
        scale = Math.max(scaleX, scaleY);
        this.bg2.setScale(scale).setScrollFactor(0);
        scaleX = this.cameras.main.width / this.bg3.width;
        scaleY = this.cameras.main.height / this.bg3.height;
        scale = Math.max(scaleX, scaleY);
        this.bg3.setScale(scale).setScrollFactor(0);
    }

    _createMap()
    {
        // Tilemap
        const tilemap = this.add.tilemap('tilemap');
        // Tilesets
        const tileset = tilemap.addTilesetImage('tileset', 'tiles/tileset');
        // Layers
        const mainLayer = tilemap.createStaticLayer('main', tileset, 0, 0);
        mainLayer.setDepth(-1)
            .setScale(2)
            .setCollisionByProperty({ collides: true });
        this.physics.add.collider(this._player1, mainLayer, null, null, this);

        // @todo add props to the map (tiles with embeded images do not work, use cutom atlas sprites instead and place them on a hardcoded x/y)
        // const propsLayer = tilemap.getObjectLayer('props')['objects'];
        // const propsGroup = this.physics.add.staticGroup();
        // propsLayer.forEach((object) => {
        //     const obj = propsGroup.create(object.x, object.y, 'props-atlas', object.name);
        //     obj.body.width = object.width;
        //     obj.body.height = object.height;
        // });
        // propsLayer.setScale(2).setDepth(-1);
    }

    create()
    {
        // Set the world size
        // world physics are bounded to the world size
        this.physics.world.setBounds(0, 0, 5000, 2500);

        this._player1 = new Player1({ scene: this, x: 100, y: 2500 / 2 + (117 * 16) / 2, key: 'player1' });
        this._enemies = this.add.group({
            classType: Enemy,
            key: 'enemy',
            frameQuantity: 2,
            active: false,
            visible: false
        });
        this._enemySpawnDelay = 2000;
        this._nextEnemySpawnTime = 0;

        this._enemies.getFirst()._spawn();

        this._player1._weapons.forEach((weapon) => {
            this.physics.add.collider(weapon._bullets, this._enemies, this._enemyHit, null, this);
        });

        this._enemies.children.each((enemy) => {
            this.physics.add.collider(enemy._getBullets(), this._player1, this._player1Hit, null, this);
        });

        this.cameras.main.startFollow(this._player1);

        this._createBackgrounds();
        this._createMap();
    }

    _parallaxBackground()
    {
        this.bg2.x = this._player1.x * -.08;
        this.bg3.x = this._player1.x * -.2;
    }

    _enemyHit(bullet, enemy)
    {
        bullet._onCollision();
        enemy._onHit(bullet._damage);
    }

    _player1Hit(bullet, player1)
    {
        bullet._onCollision();
        player1._onHit(bullet._damage);
    }

    update(time, delta)
    {
        super.update(time, delta);

        const enemy = this._enemies.getFirst();
        if (enemy && time > this._nextEnemySpawnTime) {
            enemy._spawn();
            this._nextEnemySpawnTime = time + this._enemySpawnDelay;
        }

        this._parallaxBackground();
    }
}

export default GameScene;
