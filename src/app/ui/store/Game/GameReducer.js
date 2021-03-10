import { 
    SAVE_SETTINGS,
    SET_SCENE
} from './GameAction';
import { SCENE_MAIN_MENU } from './GameConfig';

export const saveSettings = (action, state) => {
    const { userSettings } = action;

    return {
        ...state,
        userSettings
    }
};

export const setScene = (action, state) => {
    const { sceneName } = action;

    return {
        ...state,
        currentScene: sceneName
    }
};

export const GameReducer = (
    state = {
        currentScene: SCENE_MAIN_MENU
    },
    action
 ) => {
    const { type } = action;

    switch (type) {
        case SAVE_SETTINGS:
            return saveSettings(action, state);
        case SET_SCENE:
            return setScene(action, state);
        default:
            return state;
    }
};

export default GameReducer;
