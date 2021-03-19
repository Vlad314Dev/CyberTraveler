import './GameStyle';

import { IonPhaser } from '@ion-phaser/react';
import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import GameOver from 'UIComponent/GameOver';
import Hud from 'UIComponent/Hud';
import MainMenu from 'UIComponent/MainMenu';
import {
    GAME_SCENE,
    MAIN_MENU_SCENE
} from 'UIStore/Game/GameConfig';

class GameComponent extends PureComponent
{
    static propTypes = {
        initialize: PropTypes.bool.isRequired,
        game: PropTypes.object.isRequired,
        currentScene: PropTypes.string.isRequired,
        isGameOver: PropTypes.bool.isRequired
    };

    renderUI()
    {
        const {
            currentScene,
            isGameOver
        } = this.props;

        if (!isGameOver) {
            if (currentScene === MAIN_MENU_SCENE) {
                return <MainMenu />
            } else if (currentScene === GAME_SCENE) {
                return <Hud />;
            }
        } else {
            return <GameOver />;
        }
    }

    render() 
    {
        const { 
            initialize, 
            game
        } = this.props;

        return (
            <div 
                block="Game"
            >
                <IonPhaser 
                    game = { game }
                    initialize = { initialize }
                >
                    { this.renderUI() }
                </IonPhaser>
            </div>
        );
    }
}

export default GameComponent;
