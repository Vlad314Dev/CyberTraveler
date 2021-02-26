import DefaultBullet from 'GameObject/Bullet/DefaultBullet';

class TurretBullet extends DefaultBullet
{
    /**
     * Init options
     */
    _init()
    {
        this._damage = 1;

        super._init();
    }

    /**
     * Set animation keys
     */
    _initAnimKeys()
    {
        super._initAnimKeys();
        
        this._animKey.fire = 'fire/turret';
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
        this.scene.anims.create({
            key: this._animKey.fire,
            frames: this.scene.anims.generateFrameNames('city-atlas', {
                prefix: 'shot-',
                start: 1,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    /**
     * @inheritdoc
     */
    _fire(x, y, offsetX, offsetY, directionX, velocityX, velocityY, lifetime = 2000)
    {
        this._lifeTime = this.scene.time.now + lifetime;

        this.body.reset(x + offsetX, y + offsetY);
        this.body.setVelocity(velocityX * directionX, velocityY);

        this.flipX = directionX !== 1;
        this.setScale(2);
        this.setActive(true);
        this.setVisible(true);
        this.play(this._animKey.fire, true);
    }
}

export default TurretBullet;
