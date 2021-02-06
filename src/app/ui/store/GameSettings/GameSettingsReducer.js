import {
    SAVE_SETTINGS
} from './GameSettingsAction';

export const saveSettings = (action, state) => {
    const { userSettings } = action;

    return {
        ...state,
        ...userSettings
    }
};

export const ScoreReducer = (
    state = {},
    action
 ) => {
    const { type } = action;

    switch (type) {
        case SAVE_SETTINGS:
            return saveSettings(action, state);
        default:
            return state;
    }
};

export default ScoreReducer;
