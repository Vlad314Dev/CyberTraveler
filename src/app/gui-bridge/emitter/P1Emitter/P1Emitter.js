import Phaser from 'phaser';
import { store } from 'UIStore';
import { 
    REDUCE_HEALTH,
    reduceHealth,
    RESTORE_HEALTH,
    restoreHealth
} from 'UIStore/P1Health/P1HealthAction';
import {
    SET_SCORE,
    setScore
} from 'UIStore/Score/ScoreAction';
import {
    PICK_WEAPON,
    pickWeapon,
    SELECT_WEAPON,
    selectWeapon
} from 'UIStore/Weapon/WeaponAction';

export const P1Emitter = new Phaser.Events.EventEmitter();

P1Emitter.on(REDUCE_HEALTH, (damage) => store.dispatch(reduceHealth(damage)));
P1Emitter.on(RESTORE_HEALTH, (amount) => store.dispatch(restoreHealth(amount)));
P1Emitter.on(SET_SCORE, (score) => store.dispatch(setScore(score)));
P1Emitter.on(PICK_WEAPON, (weaponType) => store.dispatch(pickWeapon(weaponType)));
P1Emitter.on(SELECT_WEAPON, (weaponType) => store.dispatch(selectWeapon(weaponType)));

export default P1Emitter;
