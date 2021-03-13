import GameEmitter from 'GUIBridgeEmitter/GameEmitter';
import { 
    PLAY_GAME,
    TOGGLE_SOUND
} from 'GUIBridgeEmitter/GameEmitter/GameEmitterConfig';

import { 
    SAVE_SETTINGS,
    SET_SCENE
} from './GameAction';
import { 
    GAME_SCENE,
    MAIN_MENU_SCENE
} from './GameConfig';

export const saveSettings = (action, state) => {
    const { userSettings } = action;
    const { userSettings: oldUserSettings } = state;

    if (userSettings.audio !== oldUserSettings.audio) {
        GameEmitter.emit(TOGGLE_SOUND);
    }

    return {
        ...state,
        userSettings: userSettings
    }
};

export const setScene = (action, state) => {
    const { sceneName } = action;

    if (sceneName === GAME_SCENE) {
        GameEmitter.emit(PLAY_GAME, true);
    }

    return {
        ...state,
        currentScene: sceneName
    }
};

export const GameReducer = (
    state = {
        currentScene: MAIN_MENU_SCENE,
        userSettings: {
            audio: {
                disableWebAudio: false,
                noAudio: false
            }
        }
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
