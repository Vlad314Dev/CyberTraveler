class Player1
{
    constructor(config)
    {
        this.scene = config.scene;
        this.player1 = this.scene.add.sprite(config.x, config.y, 'player1');

        this.init();
        this.bind();
    }

    // Initialize object elements
    init()
    {
        this.scene.anims.create({
            key: 'idle-gun',
            frames: this.scene.anims.generateFrameNames('player1-atlas', {
                prefix: 'idle-gun',
                start: 4,
                end: 1
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    // Bind custom methods to use outside of the object
    bind()
    {
        this.player1.test = () => {
            console.log('test');
        }
    }

    // Use this method to retrieve the main object
    get()
    {
        return this.player1;
    }
}

export default Player1;
