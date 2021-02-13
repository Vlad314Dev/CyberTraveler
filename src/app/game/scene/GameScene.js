import Player1 from 'GameObject/Player1';
import Phaser from 'phaser';

import Enemy from '../object/npc/Enemy';

class GameScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'GameScene' });
    }

    preload()
    {
        this.load.atlas('player1-atlas', '/game/assets/atlas/player1.png', '/game/assets/atlas/player1.json');
        this.load.atlas('guns-and-shots-atlas', '/game/assets/atlas/guns-and-shots.png', '/game/assets/atlas/guns-and-shots.json');
        this.load.atlas('enemies-atlas', '/game/assets/atlas/enemies.png', '/game/assets/atlas/enemies.json');
    }

    create()
    {
        // Set the world size
        this.physics.world.setBounds(0, 0, 2000, 600);

        this._player1 = new Player1({ scene: this, x: 20, y: 100, key: 'player1' });
        this._enemies = this.add.group({
            classType: Enemy,
            key: 'enemy',
            frameQuantity: 5,
            active: false,
            visible: false
        });

        // this._enemies.getFirst()._spawn();

        this.physics.add.collider(this._player1._getBullets(), this._enemies, this._enemyHit, null, this);

        this.cameras.main.startFollow(this._player1);
    }

    update()
    {
        const enemy = this._enemies.getFirst();
        if (enemy) {
            enemy._spawn();
        }
    }

    _enemyHit(bullet, enemy)
    {
        bullet._onCollision();
        enemy._onHit();
    }
}

export default GameScene;
