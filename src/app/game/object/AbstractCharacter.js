import Phaser from 'phaser';

class AbstractCharacter extends Phaser.GameObjects.Sprite
{
    /**
     * Object constructor
     * 
     * @param {{ scene, x, y, key }} config 
     */
    constructor(config)
    {
        super(config.scene, config.x, config.y, config.key)
        
        this._scene = config.scene;
        this._scene.add.existing(this);
        this._scene.physics.world.enable(this); // Enable physics for sprite
        // Object states
        this._states = {};
        // Damage on collision
        this._damage = 1;
        // Object default hitbox data
        this._defaultHitbox = {
            _size: {
                _w: 35, 
                _h: 40
            },
            _offset: {
                _x: 20, 
                _y: 10
            }
        };
    }

    /**
     * Set data to the data manager
     * 
     * @param {string} key 
     * @param {any} value 
     * @param {boolean} force 
     */
    _setData(key, value, force = false)
    {
        const oldValue = this.getData(key);

        if (value !== oldValue || force) {
            this.setData(key, value);
        }
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
        this._setData('state', this._states[value], force);
    }

    /**
     * Set hitbox by adjusting physics body size and offset
     * 
     * @param {{size: { w: number, h: number }, offset: { x: number, y: number }}} param0 
     */
    _setHitbox({ _size, _offset })
    {
        this.body.setSize(_size._w, _size._h); // Change hitbox size
        this.body.setOffset(_offset._x, _offset._y); // Change hitbox position
    }

    /**
     * Reset hitbox to default
     */
    _resetHitbox()
    {
        this._setHitbox(this._defaultHitbox);
    }

    /**
     * Collision logic
     */
    _onCollision()
    {
    }
}

export default AbstractCharacter;
