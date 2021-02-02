import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TestEmitter from 'Emitter/TestEmitter';
import {
    TEST_EVENT
} from 'Emitter/TestEmitter/TestEmitter.config';

import GetUsers from '../../graphql/GetUsers';

import './UIStyle.scss';

class UIComponent extends PureComponent
{
    static propTypes = {
        score: PropTypes.number.isRequired
    };

    render()
    {
        const { score } = this.props;
        
        return(
            <div block="UI">
                UI Score: { score }
                User data: { <GetUsers/> }
                <button onClick={ () => TestEmitter.emit(TEST_EVENT) }>Click Me To Test Emitter</button>
            </div>
        );
    }
}

export default UIComponent;