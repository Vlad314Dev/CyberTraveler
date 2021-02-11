class Abstract
{
    /**
     * Object constructor
     * 
     * @param {object} config 
     */
    constructor(config)
    {
        this._scene = config.scene;
        this._object = this._scene.add.sprite(config.x, config.y, config.key); // Create sprite from scene
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
        const oldValue = this._object.getData('state');

        if (value !== oldValue || force) {
            this._object.setData('state', this._states[value]);
        }
    }

    /**
     * Set hitbox by adjusting physics body size and offset
     * 
     * @param {{size: { w: Number, h: Number }, offset: { x: Number, y: Number }}} param0 
     */
    _setHitbox({ size, offset })
    {
        this._object.body.setSize(size.w, size.h); // Change hitbox size
        this._object.body.setOffset(offset.x, offset.y); // Change hitbox position
    }

    /**
     * Reset hitbox to default
     */
    _resetHitbox()
    {
        this._setHitbox(this._defaultHitbox);
    }

    /**
     * Bind methods to use outside of the object
     */
    _bindMethods()
    {
        this._object.update = () => {};
    }

    /**
     * Use this method to retrieve the main sprite object
     */
    get()
    {
        return this._object;
    }
}

export default Abstract;
