import './GameStyle';

import { IonPhaser } from '@ion-phaser/react';
import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import UIWrapper from 'UIComponent/UIWrapper';
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
            return <div style={ { color: '#fff' } }>SCENE_MAIN_MENU</div>;
        } else if (currentScene === SCENE_GAME) {
            return <UIWrapper />;
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
