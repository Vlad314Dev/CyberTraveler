import DefaultBullet from 'GameObject/Bullet/DefaultBullet';

class DefaultWeapon
{
    constructor(abstractCharacter, fireRate)
    {
        this._scene = abstractCharacter._scene;
        this._character = abstractCharacter;
        this._fireRate = fireRate;
        this._setBullet({
            classType: DefaultBullet,
            key: 'guns-and-shots-atlas',
            frame: 'shot-00-01',
            frameQuantity: 50,
            active: false,
            visible: false
        });
        this._nextFireTime = 0;
        this._setProperties();
    }

    _setProperties()
    { 
    }

    _setBullet(bulletConfig)
    {
        this._bullet = bulletConfig;
        this._bullets = this._scene.add.group({ ...this._bullet });
    }

    _fire(x, y, offsetX, offsetY, directionX, velocityX)
    {
        const timeNow = this._scene.time.now;

        if (timeNow > this._nextFireTime) {
            const bullet = this._bullets.getFirst();
        
            if (bullet) {
                bullet._fire(x, y, offsetX, offsetY, directionX, velocityX);
            }

            this._nextFireTime = timeNow + this._fireRate;
        }
    }
}

export default DefaultWeapon;
