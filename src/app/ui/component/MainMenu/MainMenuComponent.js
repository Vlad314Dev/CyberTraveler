import './MainMenuStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import MainMenuAuthorize from 'UIComponent/MainMenuAuthorize';
import MainMenuAuthorizeLogin from 'UIComponent/MainMenuAuthorizeLogin';
import MainMenuAuthorizeSignup from 'UIComponent/MainMenuAuthorizeSignup';
import MainMenuDefaultComponent from 'UIComponent/MainMenuDefault';
import MainMenuLeaderboard from 'UIComponent/MainMenuLeaderboard';
import MainMenuSettings from 'UIComponent/MainMenuSettings';
import MainMenuSettingsControls from 'UIComponent/MainMenuSettingsControls';
import MainMenuTitle from 'UIComponent/MainMenuTitle';
import {
    AUTHORIZE_LOGIN_OPTION,
    AUTHORIZE_OPTION,
    AUTHORIZE_SIGNUP_OPTION,
    DEFAULT_OPTION,
    PLAY_GAME_OPTION,
    SETTINGS_AUDIO,
    SETTINGS_OPTION,
    SETTINGS_SHOW_KEYBOARD_CONTROLS,
    SETTINGS_SHOW_MOBILE_CONTROLS,
    VIEW_LEADERBOARD_OPTION
} from 'UIStore/MainMenu/MainMenuConfig';

class MainMenuComponent extends PureComponent
{
    static propTypes = {
        activeOption: PropTypes.string.isRequired
    };

    renderMenuSection()
    {
        const { 
            activeOption,
        } = this.props;

        if (activeOption === DEFAULT_OPTION) {
            return (
                <MainMenuDefaultComponent />
            );
        }

        if (activeOption === AUTHORIZE_OPTION) {
            return <MainMenuAuthorize />;
        }

        if (activeOption === AUTHORIZE_LOGIN_OPTION) {
            return <MainMenuAuthorizeLogin />;
        }

        if (activeOption === AUTHORIZE_SIGNUP_OPTION) {
            return <MainMenuAuthorizeSignup />;
        }

        if (activeOption === SETTINGS_OPTION || activeOption === SETTINGS_AUDIO) {
            return (
                <MainMenuSettings />
            );
        }

        if (activeOption === SETTINGS_SHOW_KEYBOARD_CONTROLS 
            || activeOption === SETTINGS_SHOW_MOBILE_CONTROLS
        ) {
            const type = activeOption === SETTINGS_SHOW_KEYBOARD_CONTROLS ? 'keyboard' : 'mobile';
            return (
                <MainMenuSettingsControls type={ type } />
            );
        }

        if (activeOption === VIEW_LEADERBOARD_OPTION) {
            return <MainMenuLeaderboard />;
        }
    }

    render()
    {
        const { 
            activeOption,
        } = this.props;

        if (activeOption === PLAY_GAME_OPTION) {
            // If you're here then something went wrong
            return null;
        }

        return (
            <div block="MainMenu" elem="Wrapper">
                <MainMenuTitle />
                { this.renderMenuSection() }
            </div>
        );
    }
}

export default MainMenuComponent;
