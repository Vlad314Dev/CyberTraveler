import Phaser from 'phaser';

class AbstractObject extends Phaser.GameObjects.Sprite
{
    /**
     * Object constructor
     * 
     * @param {object} config 
     */
    constructor(config)
    {
        super(config.scene, config.x, config.y)
        
        this._scene = config.scene;
        this._scene.add.existing(this);
        // this._object = this._scene.add.sprite(config.x, config.y, config.key); // Create sprite from scene
        this._defaultHitbox = {
            size: {
                w: 35, 
                h: 40
            },
            offset: {
                x: 20, 
                y: 10
            }
        };
    }

    /**
     * Set object state
     * for performance ensure that state is changed when a new value was passed
     * or when state change is forced
     * 
     * @param {string} value 
     * @param {boolean} force 
     */
    _setState(value, force = false)
    {
        const oldValue = this.getData('state');

        if (value !== oldValue || force) {
            this.setData('state', this._states[value]);
        }
    }

    /**
     * Set hitbox by adjusting physics body size and offset
     * 
     * @param {{size: { w: Number, h: Number }, offset: { x: Number, y: Number }}} param0 
     */
    _setHitbox({ size, offset })
    {
        this.body.setSize(size.w, size.h); // Change hitbox size
        this.body.setOffset(offset.x, offset.y); // Change hitbox position
    }

    /**
     * Reset hitbox to default
     */
    _resetHitbox()
    {
        this._setHitbox(this._defaultHitbox);
    }
}

export default AbstractObject;
