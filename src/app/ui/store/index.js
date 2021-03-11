import {
    combineReducers,
    createStore
} from 'redux';

import GameReducer from './Game/GameReducer';
import MainMenuReducer from './MainMenu/MainMenuReducer';
import P1HealthReducer from './P1Health/P1HealthReducer';
import ScoreReducer from './Score/ScoreReducer';
import WeaponReducer from './Weapon/WeaponReducer';

export const createReducer = () => {
    return combineReducers({
        ScoreReducer,
        GameReducer,
        P1HealthReducer,
        WeaponReducer,
        MainMenuReducer
    });
}

export const store = createStore(
    createReducer(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
