import AbstractObject from '../AbstractObject';
import Bullet from '../Bullet';

class Enemy extends AbstractObject
{
    /**
     * @inheritdoc
     */
    constructor(scene, x, y, key)
    {
        super({ scene, x, y, key });

        this._setProperties();
        this._init();
    }

    /**
     * Set properties
     */
    _setProperties()
    {
        // Object states
        this._states = {
            idle: 'idle',
            runLeft: 'runLeft',
            runRight: 'runRight'
        };
        // Object default hitbox data
        this._defaultHitbox = {
            size: {
                w: 30, 
                h: 40
            },
            offset: {
                x: 10, 
                y: 10
            }
        };
        // Object direction on X axis
        this._directionX = 1;
        // Weapon data
        this._weapons = {
            default: {
                bullet: {
                    classType: Bullet,
                    key: 'guns-and-shots-atlas',
                    frame: 'shot-00-01',
                    frameQuantity: 5,
                    active: false,
                    visible: false
                },
                fireRate: 2000, // ms
                nextFireTime: 0
            }
        };
        // Health
        this._defaultHealth = 2;
        this._health = this._defaultHealth;
        // Selected weapon
        this._selectedWeapon;
        // Time when an object will dissapear from the world
        this._lifeTime;
        // Selected weapon
        this._selectedWeapon = this._weapons.default;
        this._selectedWeapon.bullets = this._scene.add.group({ ...this._selectedWeapon.bullet });
    }

    /**
     * Init options
     */
    _init()
    {
        this.setActive(false);
        this.setVisible(false);

        this._addAnimations();
        this.play('enemy/robo-solder-run', true);

        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);

        this._resetHitbox();
    }

    /**
     * Bind events to use outside of the object
     */
    _bindEvents()
    {
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
        this._scene.anims.create({
            key: 'enemy/robo-solder-run',
            frames: this._scene.anims.generateFrameNames('enemies-atlas', {
                prefix: 'robo-soldier-run',
                start: 1,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });

        this._scene.anims.create({
            key: 'enemy/robo-solder-idle',
            frames: this._scene.anims.generateFrameNames('enemies-atlas', 'robo-soldier-run3')
        });
    }

    /**
     * Fire bullet
     */
    _fire()
    {
        const timeNow = this._scene.time.now;

        if (timeNow > this._selectedWeapon.nextFireTime) {
            const bullet = this._selectedWeapon.bullets.getFirst();
        
            if (bullet) {
                const offsetX = (this.width / 2 + 10) * this._directionX;
                const offsetY = 10;
                const velocityX = 400;

                bullet._fire(this.x, this.y, offsetX, offsetY, this._directionX, velocityX);
            }

            this._selectedWeapon.nextFireTime = timeNow + this._selectedWeapon.fireRate;
        }
    }

    /**
     * Spawn enemy
     */
    _spawn()
    {
        this._health = this._defaultHealth;
        
        this.setRandomPosition(0, this._scene.height, this._scene.width, this._scene.height);
        this.setScale(3);
        this.setActive(true);
        this.setVisible(true);

        this._lifeTime = this._scene.time.now + 20000;
    }

    /**
     * When enemy is hitted
     */
    _onHit()
    {
        if (--this._health <= 0) {
            this._deactivate();
        }
    }

    /**
     * Deactivate object from the world
     */
    _deactivate()
    {
        this.setActive(false);
        this.setVisible(false);
        this.body.reset();
    }

    /**
     * @inheritdoc
     */
    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        if (this._scene.time.now > this._lifeTime) {
            this._kill();
        }

        // This will not be executed if the object is not active
        this._fire();
        this.x += 2;
    }
}

export default Enemy;
