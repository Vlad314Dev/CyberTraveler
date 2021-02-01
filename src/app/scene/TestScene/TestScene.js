import Phaser, { Scene } from 'phaser';
import phaserImg from 'Assets/sprites/phaser2.png';

import { store } from 'Store';
import { addToScore } from 'Store/Score/Score.action';

import TestEmitter from 'Emitter/TestEmitter';
import {
    TEST_EVENT
} from 'Emitter/TestEmitter/TestEmitter.config';

class TestScene extends Scene
{
    constructor()
    {
        super();
    }

    preload()
    {
        this.load.image('phaser', phaserImg);
    }

    create()
    {
        const group = this.add.group();

        //  Add an existing Image into the group:
        const image = this.add.image(0, 0, 'phaser').setInteractive();

        group.add(image);

        //  Any action done to the group is now reflected by the Image
        //  For example this will set the position of the image to 400 x 300
        Phaser.Actions.SetXY(group.getChildren(), 400, 300);
        
        image.on('pointerdown', () => store.dispatch(addToScore(1)));

        TestEmitter.on(TEST_EVENT, () => { image.rotation += 0.01; });
    }
}

export default TestScene;
