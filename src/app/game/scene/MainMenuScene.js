import Phaser from 'phaser';

class MainMenuScene extends Phaser.Scene
{
    constructor()
    {
        super({
            key: 'MenuScene'
        })
    }

    preload()
    {
        this.load.image('bg-1', '/game/assets/background/bg-1.png');
        this.load.image('bg-2', '/game/assets/background/bg-2.png');
    }

    create()
    {
        this.scene.start('GameScene');
    }
}

export default MainMenuScene;
