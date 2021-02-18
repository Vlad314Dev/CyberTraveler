import MissileBullet from 'GameObject/Bullet/MissileBullet';
import DefaultWeapon from 'GameObject/Weapon/DefaultWeapon';

class MissileWeapon extends DefaultWeapon
{
    constructor(abstractCharacter, fireRate, bulletsCount = 1)
    {
        super(abstractCharacter, fireRate);
        
        this._setBullet({
            classType: MissileBullet,
            key: 'guns-and-shots-atlas',
            frame: 'shot-09-01',
            frameQuantity: bulletsCount,
            active: false,
            visible: false
        });
    }
}

export default MissileWeapon;
