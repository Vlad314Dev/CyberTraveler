import {
    REDUCE_HEALTH
} from './P1HealthAction';

export const reduceHealth = (action, state) => {
    const { damage } = action;
    const { p1Health } = state;

    return {
        ...state,
        p1Health: p1Health - damage
    }
};

export const P1HealthReducer = (
    state = {
        p1Health: 5
    },
    action
 ) => {
    const { type } = action;

    switch (type) {
        case REDUCE_HEALTH:
            return reduceHealth(action, state);
        default:
            return state;
    }
};

export default P1HealthReducer;
