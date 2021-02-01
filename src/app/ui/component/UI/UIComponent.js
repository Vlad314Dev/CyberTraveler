import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TestEmitter from '../../../emitter/TestEmitter';
import {
    TEST_EVENT
} from '../../../emitter/TestEmitter/TestEmitter.config';

import './UIStyle.scss';

class UITestComponent extends PureComponent
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
                <button onClick={ () => TestEmitter.emit(TEST_EVENT) }>Click Me To Test Emitter</button>
            </div>
        );
    }
}

export default UITestComponent;
