/* eslint-disable no-unused-vars */
import Enemy from 'GameObject/Npc/Enemy';
import Player1 from 'GameObject/Player1';
import Phaser from 'phaser';

class GameScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'GameScene' });

        this._player1;
        this._enemies;
        this._enemySpawnDelay;
        this._nextEnemySpawnTime;
        this._bg1;
        this._bg2;
        this._bg3;
    }

    preload()
    {
        // Atlas
        this.load.atlas('player1-atlas', '/game/assets/atlas/player1.png', '/game/assets/atlas/player1.json');
        this.load.atlas('guns-and-shots-atlas', '/game/assets/atlas/guns-and-shots.png', '/game/assets/atlas/guns-and-shots.json');
        this.load.atlas('enemies-atlas', '/game/assets/atlas/enemies.png', '/game/assets/atlas/enemies.json');
        
        // Background
        this.load.image('bg-1', '/game/assets/background/bg-1.png');
        this.load.image('bg-2', '/game/assets/background/bg-2.png');
        this.load.image('bg-3', '/game/assets/background/bg-3.png');

        // Tilemap
        this.load.image('tiles/tileset', '/game/assets/tiles/tileset.png');
        this.load.image('tiles/props', '/game/assets/tiles/props.png');
        this.load.tilemapTiledJSON('tilemap', '/game/assets/tiles/map.json');
    }

    _createBackgrounds()
    {
        const gameWidth = this.game.scale.width * 4;
        const gameHeight = 224;
        this._bg1 = this.add.tileSprite(0, this.game.scale.height / 2, gameWidth, gameHeight, 'bg-1').setDepth(-1);
        this._bg2 = this.add.tileSprite(0, this.game.scale.height / 2, gameWidth, gameHeight, 'bg-2').setDepth(-1);
        this._bg3 = this.add.tileSprite(0, this.game.scale.height / 2, gameWidth, gameHeight, 'bg-3').setDepth(-1);

        let scaleX = this.cameras.main.width / this._bg1.width;
        let scaleY = this.cameras.main.height / this._bg1.height;
        let scale = Math.max(scaleX, scaleY);
        this._bg1.setScale(scale).setScrollFactor(0);
        scaleX = this.cameras.main.width / this._bg2.width;
        scaleY = this.cameras.main.height / this._bg2.height;
        scale = Math.max(scaleX, scaleY);
        this._bg2.setScale(scale).setScrollFactor(0);
        scaleX = this.cameras.main.width / this._bg3.width;
        scaleY = this.cameras.main.height / this._bg3.height;
        scale = Math.max(scaleX, scaleY);
        this._bg3.setScale(scale).setScrollFactor(0);
    }

    _createMap()
    {
        // Tilemap
        const tilemap = this.add.tilemap('tilemap');
        // Tilesets
        const tileset = tilemap.addTilesetImage('tileset', 'tiles/tileset');
        const props = tilemap.addTilesetImage('props', 'tiles/props');
        // Layers
        const mainLayer = tilemap.createStaticLayer('main', tileset, 0, -2000);
        const propsLayer = tilemap.createStaticLayer('props', props, 0, -2000);

        mainLayer.setDepth(-1)
            .setScale(2)
            .setCollisionByProperty({ collides: true });

        propsLayer.setDepth(-1).setScale(2);
        
        this.physics.add.collider(this._player1, mainLayer, null, null, this);
        this.physics.add.collider(this._enemies, mainLayer, null, null, this);
    }

    create()
    {
        // Set the world size
        // world physics are bounded to the world size
        this.physics.world.setBounds(0, 0, 10000, 3500);

        this._player1 = new Player1({ scene: this, x: 100, y: 750 + (117 * 16) / 2, key: 'player1' });
        this._enemies = this.add.group({
            classType: Enemy,
            key: 'enemy',
            frameQuantity: 7,
            active: false,
            visible: false
        });
        this._enemySpawnDelay = 1000;
        this._nextEnemySpawnTime = 0;

        this._player1._weapons.forEach((weapon) => {
            this.physics.add.collider(weapon._bullets, this._enemies, this._enemyHit, null, this);
        });

        this._enemies.children.each((enemy) => {
            this.physics.add.collider(enemy._getBullets(), this._player1, this._playerHit, null, this);
        });

        this.cameras.main.startFollow(this._player1);

        this._createBackgrounds();
        this._createMap();
    }

    _parallaxBackground()
    {
        this._bg2.x = this._player1.x * -.08;
        this._bg3.x = this._player1.x * -.2;
    }

    _enemyHit(bullet, enemy)
    {
        bullet._onCollision();
        enemy._onHit(bullet._damage);
    }

    _playerHit(bullet, player)
    {
        bullet._onCollision();
        player._onHit(bullet._damage);
    }

    update(time, delta)
    {
        super.update(time, delta);

        if (this._player1.x > 1500) {
            const enemy = this._enemies.getFirst();
            if (enemy && time > this._nextEnemySpawnTime) {
                enemy._spawn();
                this._nextEnemySpawnTime = time + this._enemySpawnDelay;
            }
    
        }

        this._parallaxBackground();
    }
}

export default GameScene;
