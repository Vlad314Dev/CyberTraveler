import {
    PICK_WEAPON,
    SELECT_WEAPON
} from './WeaponAction';
import {
    DEFAULT_WEAPON_TYPE
} from './WeaponConfig';

export const pickWeapon = (action, state) => {
    const { weaponType } = action;
    const { availableWeapons } = state;
    // This is required because state is not changed changing availableWeapons array
    const resultWeapons = [...availableWeapons];

    // Add to the available list if does not exists
    if (!availableWeapons.some((weapon) => weapon == weaponType)) {
        resultWeapons.push(weaponType);
    }

    return {
        ...state,
        availableWeapons: resultWeapons
    }
};

export const selectWeapon = (action, state) => {
    const { weaponType } = action;

    return {
        ...state,
        selectedWeapon: weaponType
    }
};

export const WeaponReducer = (
    state = {
        selectedWeapon: DEFAULT_WEAPON_TYPE,
        availableWeapons: [DEFAULT_WEAPON_TYPE]
    },
    action
 ) => {
    const { type } = action;

    switch (type) {
        case PICK_WEAPON:
            return pickWeapon(action, state);
        case SELECT_WEAPON:
            return selectWeapon(action, state);
        default:
            return state;
    }
};

export default WeaponReducer;
