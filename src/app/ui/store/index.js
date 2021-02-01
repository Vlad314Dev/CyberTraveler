import {
    combineReducers,
    createStore
} from 'redux';
import ScoreReducer from './Score/Score.reducer';

export const createReducer = () => {
    return combineReducers({
        ScoreReducer
    });
}

export const store = createStore(
    createReducer(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
