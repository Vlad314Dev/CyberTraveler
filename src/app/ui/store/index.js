import {
    combineReducers,
    createStore
} from 'redux';

import GameSettingsReducer from './GameSettings/GameSettingsReducer';
import P1HealthReducer from './P1Health/P1HealthReducer';
import ScoreReducer from './Score/ScoreReducer';

export const createReducer = () => {
    return combineReducers({
        ScoreReducer,
        GameSettingsReducer,
        P1HealthReducer
    });
}

export const store = createStore(
    createReducer(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
