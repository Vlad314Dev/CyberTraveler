import Phaser from 'phaser';

class Bullet extends Phaser.Physics.Arcade.Sprite
{
    /**
     * @inheritdoc
     */
    constructor(scene, x, y, key, frame)
    {
        super(scene, x, y, key, frame);

        scene.physics.world.enable(this);
        
        this._setProperties();
        this._init();
        this._bindEvents();
    }

    /**
     * Set properties
     */
    _setProperties()
    {
        // Time when an object will dissapear from the world
        this._lifeTime;
        // Bullet damage used to reduce health
        this._damage = 1;
    }

    /**
     * Init options
     */
    _init()
    {
        this.body.checkWorldBounds(true);
        this.body.setAllowGravity(false);

        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = true;
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
    _fire(x, y, offsetX, offsetY, directionX, velocityX = 800)
    {   
        this._lifeTime = this.scene.time.now + 5000; // 5 sec

        this.body.reset(x + offsetX, y + offsetY);
        this.body.setVelocity(velocityX * directionX, 0);

        this.setScale(2);
        this.setActive(true);
        this.setVisible(true);
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

        // Trigger collision if object is alive for too long
        if (time > this._lifeTime) {
            this._onCollision();
        }
    }
}

export default Bullet;
