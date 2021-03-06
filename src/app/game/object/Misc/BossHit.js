import Phaser from 'phaser';

class BossHit extends Phaser.Physics.Arcade.Sprite
{
    /**
     * @inheritdoc
     */
    constructor(scene, x, y, key)
    {
        super(scene, x, y, key);

        scene.add.existing(this);

        this._init();
        this._bindEvents();
    }

    /**
     * Init options
     */
    _init()
    {
        this._addAnimations();
        this.setDepth(5);
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
        this.scene.anims.create({
            key: 'misc/boss-hit',
            frames: this.scene.anims.generateFrameNames('warped-shots-and-hits-atlas', {
                prefix: 'hits-1-',
                start: 1,
                end: 5
            }),
            frameRate: 10
        });
    }

    /**
     * Bind events for this object
     */
    _bindEvents()
    {
        this.on('animationcomplete-misc/boss-hit', () => {
            this.setActive(false);
            this.setVisible(false);
        }, this);
    }

    /**
     * Activate sprite
     */
    _activate(x, y)
    {
        this.setScale(1.5);
        
        this.x = x;
        this.y = y;
        this.setActive(true);
        this.setVisible(true);
        this.play('misc/boss-hit');
    }
}

export default BossHit;
