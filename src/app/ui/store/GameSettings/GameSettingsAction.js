export const SAVE_SETTINGS = 'SAVE_SETTINGS';

export const saveSettings = (userSettings) => ({
    type: SAVE_SETTINGS,
    userSettings
});
