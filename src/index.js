import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from 'UIStore';
import UIWrapper from 'UIComponent/UIWrapper';

import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import TestScene from 'GameScene/TestScene';

class App extends PureComponent
{
    constructor(props) 
    {
        super(props);

        this.state = {
            initialize: true,
            game: {
                width: 800,
                height: 600,
                type: Phaser.AUTO,
                audio: {
                    disableWebAudio: true
                },
                scene: [TestScene]
            }
        }
    }

    render() 
    {
        const { 
            initialize, 
            game 
        } = this.state;

        return (
            <Provider store={ store }>
                <IonPhaser 
                    game = { game }
                    initialize = { initialize }
                >
                    <UIWrapper />
                </IonPhaser>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
