import Phaser from 'phaser';

class Bullet extends Phaser.Physics.Arcade.Sprite
{
    /**
     * Bullet constructor
     * 
     * @param {object} config 
     */
    constructor(scene, x, y, key, frame)
    {
        super(scene, x, y, key, frame);

        scene.physics.world.enable(this);

        this.body.checkWorldBounds(true);
        this.body.setAllowGravity(false);

        this.body.collideWorldBounds= true;
        this.body.onWorldBounds = true;

        this._bindEvents();
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
            }
        });
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);
    }

    /**
     * Projectile execution
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} offsetX 
     * @param {number} offsetY 
     * @param {number 1 or -1} directionX 
     */
    fire(x, y, offsetX, offsetY, directionX)
    {   
        this.body.reset(x + offsetX, y + offsetY);
        this.body.setVelocity(800 * directionX, 0);

        this.setScale(2);
        this.setActive(true);
        this.setVisible(true);
    }
}

export default Bullet;
