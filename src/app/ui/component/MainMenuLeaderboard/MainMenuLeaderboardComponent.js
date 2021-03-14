import './MainMenuLeaderboardStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Leaderboard from 'UIComponent/Leaderboard';
import {
    BACK_OPTION,
    DEFAULT_OPTION,
    optionLabels
} from 'UIStore/MainMenu/MainMenuConfig';

class MainMenuLeaderboardComponent extends PureComponent
{
    static propTypes = {
        setActiveOption: PropTypes.func.isRequired
    };

    setActiveOption = (optionName) => () => {
        const { setActiveOption } = this.props;
        setActiveOption(optionName)
    }

    render()
    {
        return (
            <>
                <Leaderboard />
                <div block="MainMenuOption" elem="List">
                    {optionLabels.map((option, index) => {
                        if (option.key === BACK_OPTION) {
                            return <div 
                                block="MainMenuOption" 
                                elem="Wrapper" 
                                key={ index }
                            >
                                <span 
                                    block="MainMenuOption" 
                                    elem="Value"
                                    key={ index }
                                    onClick={ this.setActiveOption(DEFAULT_OPTION) }
                                >{ option.label }</span>
                            </div>
                        }
                        
                        return null;
                    })}
                </div>
            </>
        );
    }
}

export default MainMenuLeaderboardComponent;
