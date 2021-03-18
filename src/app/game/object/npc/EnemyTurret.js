import AbstractCharacter from 'GameObject/AbstractCharacter';
import TurretWeapon from 'GameObject/Weapon/TurretWeapon';
import { isMobile } from 'react-device-detect';

class EnemyTurret extends AbstractCharacter
{
    /**
     * @inheritdoc
     */
    constructor(scene, x, y, key)
    {
        super({ scene, x, y, key });
        // Object default hitbox data
        this._defaultHitbox = {
            _size: {
                _w: 25, 
                _h: 25
            },
            _offset: {
                _x: 0, 
                _y: 0
            }
        };
        // Object direction on X axis
        this._directionX = -1;
        // Selected weapon
        this._selectedWeapon = new TurretWeapon(this, 2000);
        this._selectedWeapon._enabled = true;
        this._bulletSpeed = isMobile ? 300 : 400;
        // Health
        this._defaultHealth = 1;
        this._health = this._defaultHealth;
        // The distance that is used by npc to chase/attack player
        this._activeDistance = 800;
        this._isDead = false;
        this._score = 300;

        this._bindEvents();
        this._init();
    }

    /**
     * Bind events to the object
     */
    _bindEvents()
    {
        
    }

    /**
     * Init options
     */
    _init()
    {
        this.setActive(true);
        this.setVisible(true);

        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        this.setScale(2);

        this._resetHitbox();

        this._addAnimations();
        this.play('enemy/turret-turn', true);
    }

    /**
     * Create animations
     */
    _addAnimations()
    {
        this._scene.anims.create({
            key: 'enemy/turret-turn',
            frames: this._scene.anims.generateFrameNames('city-atlas', {
                prefix: 'turret-',
                start: 2,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    /**
     * Fire bullet
     */
    _fire()
    {
        const weaponBullets = this._selectedWeapon._bullets;
        // Fire when all bulets are available
        // eslint-disable-next-line no-unused-vars
        const test = [weaponBullets.countActive(false), weaponBullets.countActive(true), weaponBullets.countActive(false)];
        if (weaponBullets.countActive(false) === (weaponBullets.countActive(true) + weaponBullets.countActive(false))) {
            const offsetX = (this.width / 2 + 10) * this._directionX;
            const offsetY = -10;
            const velocityX = this._bulletSpeed;
            const velocityY = this._bulletSpeed / 2;

            this._selectedWeapon._fire(this.x, this.y, offsetX, offsetY, this._directionX, velocityX, -velocityY);
            this._selectedWeapon._fire(this.x, this.y, offsetX, offsetY, this._directionX, velocityX, 0);
            this._selectedWeapon._fire(this.x, this.y, offsetX, offsetY, this._directionX, velocityX, velocityY);
        }
    }

    /**
     * When enemy is hitted
     */
    _onHit(damage = 1)
    {
        this._health -= damage;
        
        if (this._health <= 0) {
            this._deactivate();
        }
    }

    /**
     * Deactivate object from the world
     */
    _deactivate()
    {
        const enemyExplosion = this._scene._misc._enemyExplosion.getFirst();
        if (this.active && enemyExplosion) {
            enemyExplosion._activate(this.body.x, this.body.y);
        }
        this._isDead = true;
        this.destroy();
    }

    /**
     * Getter
     */
    _getBullets()
    {
        return this._selectedWeapon._bullets;
    }

    /**
     * @inheritdoc
     */
    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        // Fire if distance allows
        const p1DistanceX = this._scene._player1.x - this.x;
        this._directionX = p1DistanceX > 0 ? 1 : -1;

        if (Math.abs(p1DistanceX) <= this._activeDistance) {
            this._fire();
        }
    }
}

export default EnemyTurret;
