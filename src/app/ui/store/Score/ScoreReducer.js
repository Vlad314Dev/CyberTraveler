import {
    SET_SCORE
} from './ScoreAction';

export const setScore = (action, state) => {
    const { score } = action;

    return {
        ...state,
        score
    }
};

export const ScoreReducer = (
    state = {
        score: 0
    },
    action
 ) => {
    const { type } = action;

    switch (type) {
        case SET_SCORE:
            return setScore(action, state);
        default:
            return state;
    }
};

export default ScoreReducer;
