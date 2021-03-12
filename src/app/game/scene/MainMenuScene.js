import GameEmitter from 'GUIBridgeEmitter/GameEmitter';
import { PLAY_GAME } from 'GUIBridgeEmitter/GameEmitter/GameEmitterConfig';
import Phaser from 'phaser';

import GameScene from './GameScene';

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
        const gameWidth = this.game.scale.width * 4;
        const gameHeight = 224;
        this._bg1 = this.add.tileSprite(0, this.game.scale.height / 2, gameWidth, gameHeight, 'bg-1').setScale(3);
        this._bg2 = this.add.tileSprite(0, this.game.scale.height / 2, gameWidth, gameHeight, 'bg-2').setScale(3);
        this.scene.add('GameScene', GameScene, false);

        GameEmitter.on(PLAY_GAME, (flag) => {
            if (flag) {
                this.scene.start('GameScene');
            } else {
                this.scene.start('MenuScene');
            }
        });
    }

    update(time, delta)
    {
        super.update(time, delta);

        this._bg2.tilePositionX -= 0.2;
    }
}

export default MainMenuScene;
