import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { saveSettings } from 'UIStore/Game/GameAction';
import { setActiveOption } from 'UIStore/MainMenu/MainMenuAction';
import { 
    BACK_OPTION,
    DEFAULT_OPTION,
    SETTINGS_AUDIO
} from 'UIStore/MainMenu/MainMenuConfig';

import MainMenuSettingsComponent from './MainMenuSettingsComponent';

export const mapDispatchToProps = (dispatch) => ({
    setActiveOption: (optionName) => dispatch(setActiveOption(optionName)),
    saveSettings: (settings) => dispatch(saveSettings(settings))
});

export const mapStateToProps = (state) => ({
    activeOption: state.MainMenuReducer.activeOption,
    userSettings: state.GameReducer.userSettings
});

class MainMenuSettingsContainer extends PureComponent
{
    static propTypes = {
        setActiveOption: PropTypes.func.isRequired,
        saveSettings: PropTypes.func.isRequired,
        userSettings: PropTypes.object.isRequired
    };

    containerFunctions = {
        setActiveOption: this.setActiveOption.bind(this)
    }

    setActiveOption(optionName) {
        const { 
            setActiveOption,
            saveSettings,
            userSettings
        } = this.props;

        if (optionName === SETTINGS_AUDIO) {
            const settings = {
                audio: {
                    disableWebAudio: !userSettings.audio.disableWebAudio,
                    noAudio: !userSettings.audio.noAudio
                }
            }

            saveSettings(settings);
        } else if (optionName === BACK_OPTION) {
            setActiveOption(DEFAULT_OPTION);
        } else {
            setActiveOption(optionName);
        }
    }

    render()
    {
        return (
            <MainMenuSettingsComponent 
                { ...this.props }
                { ...this.state }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuSettingsContainer);
