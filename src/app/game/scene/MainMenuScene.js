import GameEmitter from 'GUIBridgeEmitter/GameEmitter';
import { 
    PLAY_GAME,
    TOGGLE_SOUND
 } from 'GUIBridgeEmitter/GameEmitter/GameEmitterConfig';
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
        this.load.audio('music', ['/game/assets/audio/sci_fi_platformer02.ogg']);
    }

    create()
    {
        const gameWidth = this.game.scale.width * 4;
        const gameHeight = 224;
        this._bg1 = this.add.tileSprite(0, this.game.scale.height / 2, gameWidth, gameHeight, 'bg-1').setScale(3);
        this._bg2 = this.add.tileSprite(0, this.game.scale.height / 2, gameWidth, gameHeight, 'bg-2').setScale(3);
        this.scene.add('GameScene', GameScene, false);
        const music = this.sound.add('music');
        music.loop = true;
        music.play();

        GameEmitter.on(PLAY_GAME, (flag) => {
            if (flag) {
                this.scene.start('GameScene');
            } else {
                this.scene.start('MenuScene');
            }
        });

        GameEmitter.on(TOGGLE_SOUND, () => {
            this.sound.mute = !this.sound.mute;
        });
    }

    update(time, delta)
    {
        super.update(time, delta);

        this._bg2.tilePositionX -= 0.2;
    }
}

export default MainMenuScene;
