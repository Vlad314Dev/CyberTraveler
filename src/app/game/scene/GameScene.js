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
        this.load.atlas('player1-atlas', '/game/assets/atlas/player1.png', '/game/assets/atlas/player1.json');
        this.load.atlas('guns-and-shots-atlas', '/game/assets/atlas/guns-and-shots.png', '/game/assets/atlas/guns-and-shots.json');
    }

    create()
    {
        this.player1 = new Player1({scene: this, x: 20, y: 100, key: 'player1'});
        // this.cameras.main.startFollow(this.player1);
    }

    update()
    {
        this.player1.update();
    }
}

export default GameScene;
