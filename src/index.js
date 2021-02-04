import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from 'Store';

import UI from 'Component/UI';

import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import TestScene from 'Scene/TestScene';


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
                    <UI />
                </IonPhaser>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
