import {
    DEBUG
} from './DebugAction';

export const debug = (action, state) => {
    const { debug } = action;

    return {
        ...state,
        debug
    }
};

export const DebugReducer = (
    state = {
        debug: {
            x: 0,
            y: 0,
            body_x: 0,
            body_y: 0
        }
    },
    action
 ) => {
    const { type } = action;

    switch (type) {
        case DEBUG:
            return debug(action, state);
        default:
            return state;
    }
};

export default DebugReducer;
