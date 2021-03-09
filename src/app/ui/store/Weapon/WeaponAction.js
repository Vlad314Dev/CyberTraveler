import {
    DEFAULT_WEAPON_TYPE
} from './WeaponConfig';

export const PICK_WEAPON = 'PICK_WEAPON';
export const SELECT_WEAPON = 'SELECT_WEAPON';

export const pickWeapon = (weaponType) => ({
    type: PICK_WEAPON,
    weaponType
});

export const selectWeapon = (weaponType) => ({
    type: SELECT_WEAPON,
    weaponType: weaponType || DEFAULT_WEAPON_TYPE
});
