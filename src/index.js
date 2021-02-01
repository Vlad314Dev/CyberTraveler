import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/ui/redux';

import UI from './app/ui/component/UI';

import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import TestScene from './app/scene/TestScene';

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
                    <UI />
                </IonPhaser>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
