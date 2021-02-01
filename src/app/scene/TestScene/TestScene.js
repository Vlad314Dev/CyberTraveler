import Phaser, { Scene } from 'phaser';
import TestEmitter from '../../emmiter/TestEmitter';
import phaserImg from '../../assets/sprites/phaser2.png';

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
        
        image.on('pointerdown', function () {
            TestEmitter.emit('TEST_EVENT');
        });
    }
}

export default TestScene;
