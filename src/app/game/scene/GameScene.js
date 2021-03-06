import BossHit from 'GameObject/Misc/BossHit';
import EnemyExplosion from 'GameObject/Misc/EnemyExplosion';
import HitExplosion from 'GameObject/Misc/HitExplosion';
import Boss from 'GameObject/Npc/Boss';
import Enemy from 'GameObject/Npc/Enemy';
import EnemyTurret from 'GameObject/Npc/EnemyTurret';
import Player1 from 'GameObject/Player1';
import Phaser from 'phaser';

class GameScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'GameScene' });

        this._player1;
        this._enemies;
        this._turrets;
        this._enemySpawnDelay;
        this._nextEnemySpawnTime;
        this._bg1;
        this._bg2;
        this._bg3;
        this._mainLayer;
        this._propsLayer;
    }

    preload()
    {
        // Atlas
        this.load.atlas('player1-atlas', '/game/assets/atlas/player1.png', '/game/assets/atlas/player1.json');
        this.load.atlas('guns-and-shots-atlas', '/game/assets/atlas/guns-and-shots.png', '/game/assets/atlas/guns-and-shots.json');
        this.load.atlas('enemies-atlas', '/game/assets/atlas/enemies.png', '/game/assets/atlas/enemies.json');
        this.load.atlas('city-atlas', '/game/assets/atlas/city.png', '/game/assets/atlas/city.json');
        this.load.atlas('boss-atlas', '/game/assets/atlas/boss.png', '/game/assets/atlas/boss.json');
        this.load.atlas('warped-shots-and-hits-atlas', '/game/assets/atlas/warped-shots-and-hits.png', '/game/assets/atlas/warped-shots-and-hits.json');
        
        // Background
        this.load.image('bg-1', '/game/assets/background/bg-1.png');
        this.load.image('bg-2', '/game/assets/background/bg-2.png');
        this.load.image('bg-3', '/game/assets/background/bg-3.png');

        // Tilemap
        this.load.image('tiles/tileset', '/game/assets/tiles/tileset.png');
        this.load.image('tiles/props', '/game/assets/tiles/props.png');
        this.load.tilemapTiledJSON('tilemap', '/game/assets/tiles/map.json');

        // Misc
        this.load.spritesheet('misc/hit-1', '/game/assets/sprites/explosion-1.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('misc/explosion-6', '/game/assets/sprites/explosion-6.png', {
            frameWidth: 48,
            frameHeight: 48
        });
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
        this._mainLayer = tilemap.createStaticLayer('main', tileset, 0, -2000);
        this._propsLayer = tilemap.createStaticLayer('props', props, 0, -2000);

        this._mainLayer.setDepth(-1)
            .setScale(2)
            .setCollisionByProperty({ collides: true });

        this._propsLayer.setDepth(-1).setScale(2);

        this._turrets = tilemap.getObjectLayer('turrets')['objects'];
    }

    create()
    {
        this._createBackgrounds();
        this._createMap();

        // Set the world size
        // world physics are bounded to the world size
        this.physics.world.setBounds(0, 0, 10000, 3500);

        this._misc = {
            _hitExplosion: this.add.group({
                classType: HitExplosion,
                key: 'hit-explosion',
                frameQuantity: 5,
                active: false,
                visible: false
            }),
            _enemyExplosion: this.add.group({
                classType: EnemyExplosion,
                key: 'enemy-explosion',
                frameQuantity: 3,
                active: false,
                visible: false
            }),
            _bossHit: this.add.group({
                classType: BossHit,
                key: 'boss-hit',
                frameQuantity: 3,
                active: false,
                visible: false
            }),
        };

        this._player1 = new Player1({ scene: this, x: 100, y: 750 + (117 * 16) / 2, key: 'player1' });
        this._enemies = this.add.group({
            classType: Enemy,
            key: 'enemy',
            frameQuantity: 7,
            active: false,
            visible: false
        });
        this._turrets.forEach((turret) => {
            this._enemies.add(new EnemyTurret(this, turret.x * 2, turret.y / 2, 'enemy/enemy-turret'));
        });
        this._enemySpawnDelay = 1000;
        this._nextEnemySpawnTime = 0;

        this._boss = new Boss(this, 1200, 1540, 'boss');

        Object.keys(this._boss._attack._type).forEach((attack) => {
            const bossAttack = this._boss._attack._type[attack];
            this.physics.add.collider(bossAttack._bullets, this._player1, this._playerHit, null, this);
        });

        this._player1._weapons.forEach((weapon) => {
            this.physics.add.collider(weapon._bullets, this._enemies, this._p1EnemyHit, null, this);
        });

        this._enemies.children.each((enemy) => {
            this.physics.add.overlap(enemy, this._player1, this._playerEnemyOverlap, null, this);
            this.physics.add.collider(enemy._getBullets(), this._player1, this._p1EnemyHit, null, this);
        });

        this.physics.add.collider(this._player1, this._mainLayer, null, null, this);
        this.physics.add.collider(this._enemies, this._mainLayer, null, null, this);

        this.cameras.main.startFollow(this._player1);
    }

    _parallaxBackground()
    {
        this._bg2.x = this._player1.x * -.08;
        this._bg3.x = this._player1.x * -.2;
    }

    _p1EnemyHit(bullet, enemy)
    {
        bullet._onCollision();
        const wasDead = enemy._isDead;
        enemy._onHit(bullet._damage);
        const isDead = enemy._isDead;

        if (wasDead !== isDead && isDead === true) {
            this._player1._addScore(enemy._score);
        }
    }

    _playerHit(bullet, player)
    {
        bullet._onCollision();
        player._onHit(bullet._damage);
    }

    _playerEnemyOverlap(enemy, player)
    {
        enemy._onCollision();
        player._onHit(enemy._damage);
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
