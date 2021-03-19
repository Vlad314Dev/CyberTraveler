export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const SET_SCENE = 'SET_SCENE';
export const SET_GAME_OVER = 'SET_IS_GAME_OVER';

export const saveSettings = (userSettings) => ({
    type: SAVE_SETTINGS,
    userSettings
});

export const setScene = (sceneName) => ({
    type: SET_SCENE,
    sceneName
})

export const setGameOver = (isGameOver) => ({
    type: SET_GAME_OVER,
    isGameOver
});
