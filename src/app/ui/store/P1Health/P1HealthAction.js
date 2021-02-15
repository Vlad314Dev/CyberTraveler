export const REDUCE_HEALTH = 'REDUCE_HEALTH';

export const reduceHealth = (damage) => ({
    type: REDUCE_HEALTH,
    damage
});
