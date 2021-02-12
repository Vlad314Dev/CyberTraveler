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
    }

    /**
     * Projectile execution
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number 1 or -1} directionX 
     */
    fire(x, y, directionX)
    {
        const offsetX = 45 * directionX;

        this.body.reset(x + offsetX, y);
        this.body.setVelocity(800 * directionX, 0);

        this.setScale(2);
        this.setActive(true);
        this.setVisible(true);
    }
}

export default Bullet;
