import Phaser from 'phaser';

class DefaultBullet extends Phaser.Physics.Arcade.Sprite
{
    /**
     * @inheritdoc
     */
    constructor(scene, x, y, key, frame)
    {
        super(scene, x, y, key, frame);

        scene.physics.world.enable(this);
        
        // Time when an object will dissapear from the world
        this._lifeTime;
        // Bullet damage used to reduce health
        this._damage = 1;

        this._init();
        this._bindEvents();
    }

    /**
     * Init options
     */
    _init()
    {
        this.setImmovable(true);
        
        this.body.checkWorldBounds(true);
        this.body.setAllowGravity(false);

        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = true;

        this._initAnimKeys();
        this._addAnimations();
    }

    /**
     * Set animation keys
     */
    _initAnimKeys() 
    {
        this._animKey = {
            fire: 'bullet/fire'
        };
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
        this.scene.anims.create({
            key: this._animKey.fire,
            frames: this.scene.anims.generateFrameNames('guns-and-shots-atlas', {
                prefix: 'shot-00-0',
                start: 1,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    /**
     * Bind events for this object
     */
    _bindEvents()
    {
        // Reload objects for reuse on world collision
        this.body.world.on('worldbounds', (body) => {
            if (body.gameObject === this) {
                this.setActive(false);
                this.setVisible(false);
                this.body.reset();
            }
        });
    }

    /**
     * Projectile execution
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} offsetX 
     * @param {number} offsetY 
     * @param {number 1 or -1} directionX 
     * @param {number} velocityX 
     */
    _fire(x, y, offsetX, offsetY, directionX, velocityX = 800, lifetime = 5000)
    {   
        this._lifeTime = this.scene.time.now + lifetime; // 5 sec

        this.body.reset(x + offsetX, y + offsetY);
        this.body.setVelocity(velocityX * directionX, 0);

        this.flipX = directionX !== 1;
        this.setScale(2);
        this.setActive(true);
        this.setVisible(true);
        this.play(this._animKey.fire, true);
    }

    /**
     * Hide object from scene on collide
     */
    _onCollision()
    {
        this.setActive(false);
        this.setVisible(false);
        this.body.reset(); // Without reset the body will be still in scene
    }

    /**
     * @inheritdoc
     */
    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        // Hide and reset the object if visible for too long
        if (time > this._lifeTime) {
            this.setActive(false);
            this.setVisible(false);
            this.body.reset();
        }
    }
}

export default DefaultBullet;
