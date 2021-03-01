import Phaser from 'phaser';

class HitExplosion extends Phaser.Physics.Arcade.Sprite
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
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
        this.scene.anims.create({
            key: 'misc/hit-explosion',
            frames: this.scene.anims.generateFrameNumbers('misc/hit-1', { start: 0, end: 7 }),
            frameRate: 10
        });
    }

    /**
     * Bind events for this object
     */
    _bindEvents()
    {
        this.on('animationcomplete-misc/hit-explosion', () => {
            this.setActive(false);
            this.setVisible(false);
        }, this);
    }

    /**
     * Activate sprite
     */
    _activate(x, y)
    {
        this.x = x;
        this.y = y;
        this.setActive(true);
        this.setVisible(true);
        this.play('misc/hit-explosion');
    }
}

export default HitExplosion;
