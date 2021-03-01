import {
    DEFAULT_HEALTH_AMOUNT
} from './P1HealthConfig';

export const REDUCE_HEALTH = 'REDUCE_HEALTH';
export const RESTORE_HEALTH = 'RESTORE_HEALTH';

export const reduceHealth = (damage) => ({
    type: REDUCE_HEALTH,
    damage
});

export const restoreHealth = (amount) => ({
    type: RESTORE_HEALTH,
    amount: amount || DEFAULT_HEALTH_AMOUNT
});
