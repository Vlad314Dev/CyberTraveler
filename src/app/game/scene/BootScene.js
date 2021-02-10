import Phaser from 'phaser';

class BootScene extends Phaser.Scene
{
    constructor()
    {
        super({
            key: 'BootScene'
        })
    }

    preload()
    {
        // const progress = this.add.graphics();

        // // Register a load progress event to show a load bar
        // this.load.on('progress', (value) => {
        //     progress.clear();
        //     progress.fillStyle(0xffffff, 1);
        //     progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        // });

        // // Register a load complete event to launch the title screen when all files are loaded
        // this.load.on('complete', () => {
        //     // @todo prepare all animations, defined in a separate file
        //     progress.destroy();
        //     // this.scene.start('MainMenuScene');
        //     this.scene.start('GameScene');
        // });

        // this.load.atlas('player1-atlas', '/game/assets/player1/atlas/player1.png', '/game/assets/player1/atlas/player1.json');
        this.scene.start('GameScene');
    }
}

export default BootScene;
