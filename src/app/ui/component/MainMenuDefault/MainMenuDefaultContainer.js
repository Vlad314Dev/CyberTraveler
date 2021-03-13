import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setScene } from 'UIStore/Game/GameAction';
import { GAME_SCENE } from 'UIStore/Game/GameConfig';
import { setActiveOption } from 'UIStore/MainMenu/MainMenuAction';
import { PLAY_GAME_OPTION } from 'UIStore/MainMenu/MainMenuConfig';

import MainMenuDefaultComponent from './MainMenuDefaultComponent';

export const mapDispatchToProps = (dispatch) => ({
    setActiveOption: (optionName) => dispatch(setActiveOption(optionName)),
    setScene: (sceneName) => dispatch(setScene(sceneName))
});

export const mapStateToProps = (state) => ({
    activeOption: state.MainMenuReducer.activeOption
});

class MainMenuDefaultContainer extends PureComponent
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
            <MainMenuDefaultComponent 
                { ...this.props }
                { ...this.state }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuDefaultContainer);
