import React, { PureComponent } from 'react'; 
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import TestSceneComponent from '../../../../scenes/TestScene.js';
import UITest from '../UITest';
import { Provider } from 'react-redux';
import { store } from '../../stores/Store.js';

class App extends PureComponent
{
    constructor() 
    {
        super();
        this.state = {
            initialize: true,
            game: {
                width: 800,
                height: 600,
                type: Phaser.AUTO,
                audio: {
                    disableWebAudio: true
                },
                scene: [TestSceneComponent]
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
            <IonPhaser 
                    game = { game }
                    initialize = { initialize }
            >
                <Provider store={ store }>
                    <UITest />
                </Provider>
            </IonPhaser>
        );
    }
}

export default App;
