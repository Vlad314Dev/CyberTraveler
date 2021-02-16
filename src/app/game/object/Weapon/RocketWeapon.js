import RocketBullet from 'GameObject/Bullet/RocketBullet';
import DefaultWeapon from 'GameObject/Weapon/DefaultWeapon';

class RocketWeapon extends DefaultWeapon
{
    constructor(abstractCharacter, fireRate)
    {
        super(abstractCharacter, fireRate);
        
        this._setBullet({
            classType: RocketBullet,
            key: 'guns-and-shots-atlas',
            frame: 'shot-09-01',
            frameQuantity: 50,
            active: false,
            visible: false
        });
    }
}

export default RocketWeapon;
