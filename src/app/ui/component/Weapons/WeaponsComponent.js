import './WeaponsStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
    DEFAULT_WEAPON_TYPE,
    MISSILE_WEAPON_TYPE,
    PIERCE_WEAPON_TYPE 
} from 'UIStore/Weapon/WeaponConfig';

class WeaponsComponent extends PureComponent
{
    static propTypes = {
        selectedWeapon: PropTypes.string.isRequired,
        availableWeapons: PropTypes.array.isRequired
    };

    isWeaponAvailable(weaponType)
    {
        const { 
            availableWeapons 
        } = this.props;

        return availableWeapons.some((weapon) => weapon == weaponType);
    }

    render()
    {
        const {
            selectedWeapon
        } = this.props;

        return (
            <div block="Weapon" elem="Wrapper">
                <div block="Weapon" elem="List">
                    <div block="Weapon" mods={ { type: 'default', isSelected: selectedWeapon == 'default' } }>
                        <span block="Weapon" elem="Availability" mods={ { isAvailable: this.isWeaponAvailable(DEFAULT_WEAPON_TYPE) } }></span>
                    </div>
                    <div block="Weapon" mods={ { type: 'pierce', isSelected: selectedWeapon == 'pierce' } }>
                        <span block="Weapon" elem="Availability" mods={ { isAvailable: this.isWeaponAvailable(PIERCE_WEAPON_TYPE) } }></span>
                    </div>
                    <div block="Weapon" mods={ { type: 'missile', isSelected: selectedWeapon == 'missile' } }>
                        <span block="Weapon" elem="Availability" mods={ { isAvailable: this.isWeaponAvailable(MISSILE_WEAPON_TYPE) } }></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeaponsComponent;
