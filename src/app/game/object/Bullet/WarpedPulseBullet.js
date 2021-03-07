import DefaultBullet from 'GameObject/Bullet/DefaultBullet';
import Phaser from 'phaser';

class WarpedPulseBullet extends DefaultBullet
{
    /**
     * Init options
     */
    _init()
    {
        this._damage = 1;

        super._init();
        this.setBounce(1);
    }

    /**
     * Set animation keys
     */
    _initAnimKeys()
    {
        super._initAnimKeys();
        
        this._animKey.fire = 'warped/pulse';
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
        this.scene.anims.create({
            key: this._animKey.fire,
            frames: this.scene.anims.generateFrameNames('warped-shots-and-hits-atlas', {
                prefix: 'pulse',
                start: 1,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    /**
     * Missile execution
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} offsetX 
     * @param {number} offsetY 
     * @param {number 1 or -1} directionX 
     * @param {number} velocityX 
     */
    _fire(x, y, offsetX, offsetY, directionX, velocityX, velocityY, lifetime = 7000)
    {   
        this._lifeTime = this.scene.time.now + lifetime;
        this._directionX = directionX;

        this.body.reset(x + offsetX, y + offsetY);

        this.setVelocity(velocityX, velocityY);
        this.rotation = Phaser.Math.Angle.Between(0, 0, velocityX, velocityY);

        this.setScale(1.5);
        this.setActive(true);
        this.setVisible(true);
        this.play(this._animKey.fire, true);
    }

    /**
     * Hide object from scene on collide
     */
    _onCollision()
    {
        const bossHit = this.scene._misc._bossHit.getFirst();
        if (this.active && bossHit) {
            // Centrate hit appearance
            bossHit._activate(this.body.x, this.body.y + this.height / 2);
        }

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

        if (this.body.velocity.x) {
            this.rotation = Phaser.Math.Angle.Between(0, 0, this.body.velocity.x, this.body.velocity.y);
        }
    }
}

export default WarpedPulseBullet;
