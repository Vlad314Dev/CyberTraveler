import Player1 from 'GameObject/Player1';
import Phaser from 'phaser';

class GameScene extends Phaser.Scene
{
    constructor()
    {
        super({
            key: 'GameScene'
        });
    }

    preload()
    {
        this.load.atlas('player1-atlas', '/game/assets/player1/atlas/player1.png', '/game/assets/player1/atlas/player1.json');
    }

    create()
    {
        this.player1 = new Player1({scene: this, x: 20, y: 100, key: 'player1'}).get();
        // this.cameras.main.startFollow(this.player1);
    }

    update()
    {
        this.player1.update();
    }
}

export default GameScene;
