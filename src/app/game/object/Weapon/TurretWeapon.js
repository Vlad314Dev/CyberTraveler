import TurretBullet from 'GameObject/Bullet/TurretBullet';
import DefaultWeapon from 'GameObject/Weapon/DefaultWeapon';

class TurretWeapon extends DefaultWeapon
{
    constructor(abstractCharacter, fireRate, bulletsCount = 3)
    {
        super(abstractCharacter, fireRate);
  
        this._setBullet({
            classType: TurretBullet,
            key: 'city-atlas',
            frame: 'shot-1',
            frameQuantity: bulletsCount,
            active: false,
            visible: false
        });

        this._enabled = true;
        this._type = 'turret';
        this._bulletsCount = bulletsCount;
    }

    _fire(x, y, offsetX, offsetY, directionX, velocityX, velocityY)
    {
        const bullet = this._bullets.getFirst();

        if (bullet) {
            bullet._fire(x, y, offsetX, offsetY, directionX, velocityX, velocityY);
        }
    }
}

export default TurretWeapon;
