import {
    combineReducers,
    createStore
} from 'redux';

import GameSettingsReducer from './GameSettings/GameSettingsReducer';
import ScoreReducer from './Score/ScoreReducer';

export const createReducer = () => {
    return combineReducers({
        ScoreReducer,
        GameSettingsReducer
    });
}

export const store = createStore(
    createReducer(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
