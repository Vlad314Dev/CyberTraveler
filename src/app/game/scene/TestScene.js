import phaserImg from 'GameAssets/sprites/phaser2.png';
import TestSceneEmitter, {
    TEST_EVENT,
    TEST_POINTERDOWN_EVENT
} from 'GUIBridgeEmitter/TestSceneEmitter';
import IOWrapper from 'IOWrapper';
import Phaser, { Scene } from 'phaser';

class TestScene extends Scene
{
    preload()
    {
        this.load.image('phaser', phaserImg);
    }

    create()
    {
        if (navigator.onLine) {
            const socket = new IOWrapper();
            socket.emit('SOCKET_TEST', 'Call server from a client from TestScene.');
        }

        const group = this.add.group();

        //  Add an existing Image into the group:
        const image = this.add.image(0, 0, 'phaser').setInteractive();

        group.add(image);

        //  Any action done to the group is now reflected by the Image
        //  For example this will set the position of the image to 400 x 300
        Phaser.Actions.SetXY(group.getChildren(), 400, 300);
        
        image.on('pointerdown', () => TestSceneEmitter.emit(TEST_POINTERDOWN_EVENT));

        TestSceneEmitter.on(TEST_EVENT, () => { image.rotation += 0.01; });
    }
}

export default TestScene;
