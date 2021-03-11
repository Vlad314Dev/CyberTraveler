import './GameStyle';

import { IonPhaser } from '@ion-phaser/react';
import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import Hud from 'UIComponent/Hud';
import MainMenu from 'UIComponent/MainMenu';
import {
    SCENE_GAME,
    SCENE_MAIN_MENU
} from 'UIStore/Game/GameConfig';

class GameComponent extends PureComponent
{
    static propTypes = {
        initialize: PropTypes.bool.isRequired,
        game: PropTypes.object.isRequired,
        currentScene: PropTypes.string.isRequired
    };

    renderUI()
    {
        const {
            currentScene
        } = this.props;

        if (currentScene === SCENE_MAIN_MENU) {
            return <MainMenu />
        } else if (currentScene === SCENE_GAME) {
            return <Hud />;
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
