import Phaser from 'phaser';

class EnemyExplosion extends Phaser.Physics.Arcade.Sprite
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
            key: 'misc/enemy-explosion',
            frames: this.scene.anims.generateFrameNumbers('misc/explosion-6', { start: 0, end: 7 }),
            frameRate: 10
        });
    }

    /**
     * Bind events for this object
     */
    _bindEvents()
    {
        this.on('animationcomplete-misc/enemy-explosion', () => {
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
        this.play('misc/enemy-explosion');
    }
}

export default EnemyExplosion;
