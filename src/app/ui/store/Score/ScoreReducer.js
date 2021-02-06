import {
    ADD_TO_SCORE
} from './ScoreAction';

export const addToScore = (action, state) => {
    const { score } = action;
    const { score: oldScore } = state;

    return {
        ...state,
        score: oldScore + score
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
        case ADD_TO_SCORE:
            return addToScore(action, state);
        default:
            return state;
    }
};

export default ScoreReducer;
