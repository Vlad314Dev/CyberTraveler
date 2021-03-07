import DefaultBullet from 'GameObject/Bullet/DefaultBullet';
import Phaser from 'phaser';

class WaveformPulseBullet extends DefaultBullet
{
    /**
     * Init options
     */
    _init()
    {
        this._damage = 1;

        super._init();

        this.body.setSize(32, 95); // Change hitbox size
        this.body.setOffset(30, -30); // Change hitbox position
    }

    /**
     * Set animation keys
     */
    _initAnimKeys()
    {
        super._initAnimKeys();
        
        this._animKey.fire = 'warped/waveform';
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
        this.scene.anims.create({
            key: this._animKey.fire,
            frames: this.scene.anims.generateFrameNames('warped-shots-and-hits-atlas', {
                prefix: 'waveform',
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
    _fire(x, y, offsetX, offsetY, directionX, velocityX, velocityY)
    {   
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
            bossHit._activate(this.body.x + this.body.width / 2, this.body.y + this.body.height);
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
    }
}

export default WaveformPulseBullet;
