import './MainMenuOptionStyle';

// import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
    AUTHORIZE_OPTION,
    optionLabels,
    PLAY_GAME_OPTION,
    SETTINGS_OPTION,
    VIEW_LEADERBOARD_OPTION
} from 'UIStore/MainMenu/MainMenuConfig';

class MainMenuOptionComponent extends PureComponent
{
    render()
    {
        return (
            <div block="MainMenuOption" elem="List">
                {optionLabels.map((option, index) => {
                    if (option.key === AUTHORIZE_OPTION 
                        || option.key === PLAY_GAME_OPTION
                        || option.key === SETTINGS_OPTION 
                        || option.key === VIEW_LEADERBOARD_OPTION
                    ) {
                        return <div 
                            block="MainMenuOption" 
                            elem="Wrapper" 
                            key={ index }
                        >
                            <span 
                                block="MainMenuOption" 
                                elem="Value"
                                key={ index }
                            >{ option.label }</span>
                        </div>
                    }
                    
                    return null;
                })}
            </div>
        );
    }
}

export default MainMenuOptionComponent;
