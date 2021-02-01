import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import ReduxStore from './app/ui/store/ReduxStore';
import ReactDOM from 'react-dom'; 
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import TestSceneComponent from './app/scene/TestScene';
import UITest from './app/ui/component/UITest';

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
            <Provider store={ ReduxStore }>
                <IonPhaser 
                    game = { game }
                    initialize = { initialize }
                >
                    <UITest />
                </IonPhaser>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
