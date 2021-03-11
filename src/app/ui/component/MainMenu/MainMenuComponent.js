import './MainMenuStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import MainMenuOptionComponent from 'UIComponent/MainMenuOption';
import MainMenuTitle from 'UIComponent/MainMenuTitle';
import {
    AUTHORIZE_OPTION,
    DEFAULT_OPTION,
    PLAY_GAME_OPTION,
    SETTINGS_OPTION,
    VIEW_LEADERBOARD_OPTION,
} from 'UIStore/MainMenu/MainMenuConfig';

class MainMenuComponent extends PureComponent
{
    static propTypes = {
        activeOption: PropTypes.string.isRequired
    };

    render()
    {
        const { 
            activeOption,
        } = this.props;

        if (activeOption === DEFAULT_OPTION) {
            return (
                <div block="MainMenu" elem="Wrapper">
                    <MainMenuTitle />
                    <MainMenuOptionComponent />
                </div>
            );
        }

        if (activeOption === AUTHORIZE_OPTION) {
            return null;
        }

        if (activeOption === SETTINGS_OPTION) {
            return null;
        }

        if (activeOption === VIEW_LEADERBOARD_OPTION) {
            return null;
        }

        // If you're here then something went wrong
        if (activeOption === PLAY_GAME_OPTION) {
            return null;
        }

        return null;
    }
}

export default MainMenuComponent;
