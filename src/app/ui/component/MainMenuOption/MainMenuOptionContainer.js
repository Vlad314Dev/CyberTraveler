import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setScene } from 'UIStore/Game/GameAction';
import { GAME_SCENE } from 'UIStore/Game/GameConfig';
import { setActiveOption } from 'UIStore/MainMenu/MainMenuAction';
import { PLAY_GAME_OPTION } from 'UIStore/MainMenu/MainMenuConfig';

import MainMenuOptionComponent from './MainMenuOptionComponent';

export const mapDispatchToProps = (dispatch) => ({
    setActiveOption: (optionName) => dispatch(setActiveOption(optionName)),
    setScene: (sceneName) => dispatch(setScene(sceneName))
});

class MainMenuOptionContainer extends PureComponent
{
    static propTypes = {
        setActiveOption: PropTypes.func.isRequired,
        setScene: PropTypes.func.isRequired
    };

    containerFunctions = {
        setActiveOption: this.setActiveOption.bind(this)
    }

    setActiveOption(optionName) {
        const { 
            setActiveOption,
            setScene
        } = this.props;
        
        setActiveOption(optionName);

        if (optionName === PLAY_GAME_OPTION) {
            setScene(GAME_SCENE);
        }
    }

    render()
    {
        return (
            <MainMenuOptionComponent 
                { ...this.props }
                { ...this.state }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MainMenuOptionContainer);
