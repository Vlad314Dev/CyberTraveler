import FireBullet from 'GameObject/Bullet/FireBullet';
import DefaultWeapon from 'GameObject/Weapon/DefaultWeapon';

class FireWeapon extends DefaultWeapon
{
    constructor(abstractCharacter, fireRate, bulletsCount = 1)
    {
        super(abstractCharacter, fireRate);
        
        this._setBullet({
            classType: FireBullet,
            key: 'guns-and-shots-atlas',
            frame: 'shot-06-01',
            frameQuantity: bulletsCount,
            active: false,
            visible: false
        });

        this._enabled = true;
        this._type = 'fire';
    }
}

export default FireWeapon;
