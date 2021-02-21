import './GameStyle';

import { IonPhaser } from '@ion-phaser/react';
import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import UIWrapper from 'UIComponent/UIWrapper';

class GameComponent extends PureComponent
{
    static propTypes = {
        initialize: PropTypes.bool.isRequired,
        game: PropTypes.object.isRequired
    };

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
                    <UIWrapper />
                </IonPhaser>
            </div>
        );
    }
}

export default GameComponent;
