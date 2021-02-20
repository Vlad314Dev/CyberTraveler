import PierceBullet from 'GameObject/Bullet/PierceBullet';
import DefaultWeapon from 'GameObject/Weapon/DefaultWeapon';

class PierceWeapon extends DefaultWeapon
{
    constructor(abstractCharacter, fireRate, bulletsCount = 1)
    {
        super(abstractCharacter, fireRate);
        
        this._setBullet({
            classType: PierceBullet,
            key: 'guns-and-shots-atlas',
            frame: 'shot-07-01',
            frameQuantity: bulletsCount,
            active: false,
            visible: false
        });
    }

    _setProperties()
    {
        this._type = 'pierce';
    }
}

export default PierceWeapon;
