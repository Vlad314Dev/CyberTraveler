import DefaultBullet from 'GameObject/Bullet/DefaultBullet';

class FireBullet extends DefaultBullet
{
    /**
     * Init options
     */
    _init()
    {
        this._damage = 1.5;

        super._init();
    }

    /**
     * Set animation keys
     */
    _initAnimKeys()
    {
        super._initAnimKeys();
        
        this._animKey.fire = 'fire/fire';
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
        this.scene.anims.create({
            key: this._animKey.fire,
            frames: this.scene.anims.generateFrameNames('guns-and-shots-atlas', {
                prefix: 'shot-06-0',
                start: 1,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    /**
     * @inheritdoc
     */
    _fire(x, y, offsetX, offsetY, directionX, velocityX, lifetime = 1000)
    {
        super._fire(x, y, offsetX, offsetY, directionX, velocityX, lifetime)
    }
}

export default FireBullet;
