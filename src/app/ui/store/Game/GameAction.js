export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const SET_SCENE = 'SEt_SCENE';

export const saveSettings = (userSettings) => ({
    type: SAVE_SETTINGS,
    userSettings
});

export const setScene = (sceneName) => ({
    type: SET_SCENE,
    sceneName
})
