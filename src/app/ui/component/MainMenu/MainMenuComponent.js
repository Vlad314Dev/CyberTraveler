import './MainMenuStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import MainMenuDefaultComponent from 'UIComponent/MainMenuDefault';
import MainMenuSettings from 'UIComponent/MainMenuSettings';
import MainMenuSettingsControls from 'UIComponent/MainMenuSettingsControls';
import MainMenuTitle from 'UIComponent/MainMenuTitle';
import {
    AUTHORIZE_OPTION,
    DEFAULT_OPTION,
    PLAY_GAME_OPTION,
    SETTINGS_OPTION,
    SETTINGS_SHOW_CONTROLS,
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
            return null;
        }

        if (activeOption === SETTINGS_OPTION) {
            return (
                <MainMenuSettings />
            );
        }

        if (activeOption === SETTINGS_SHOW_CONTROLS) {
            return (
                <MainMenuSettingsControls />
            );
        }

        if (activeOption === VIEW_LEADERBOARD_OPTION) {
            return null;
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
