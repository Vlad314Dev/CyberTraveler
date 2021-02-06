import Game from 'GUIBridgeComponent/Game'
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import store from 'UIStore';

class AppComponent extends PureComponent
{
    render() 
    {
        return (
            <Provider store={ store }>
                <Game />
            </Provider>
        );
    }
}

export default AppComponent;
