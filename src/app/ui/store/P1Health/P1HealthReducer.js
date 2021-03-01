import {
    REDUCE_HEALTH,
    RESTORE_HEALTH
} from './P1HealthAction';
import {
    DEFAULT_HEALTH_AMOUNT
} from './P1HealthConfig';

export const reduceHealth = (action, state) => {
    const { damage } = action;
    const { p1Health } = state;

    return {
        ...state,
        p1Health: p1Health - damage
    }
};

export const restoreHealth = (action, state) => {
    const { amount } = action;
    const { p1Health } = state;

    return {
        ...state,
        p1Health: p1Health + amount
    }
};

export const P1HealthReducer = (
    state = {
        p1Health: DEFAULT_HEALTH_AMOUNT
    },
    action
 ) => {
    const { type } = action;

    switch (type) {
        case REDUCE_HEALTH:
            return reduceHealth(action, state);
        case RESTORE_HEALTH:
            return restoreHealth(action, state);
        default:
            return state;
    }
};

export default P1HealthReducer;
