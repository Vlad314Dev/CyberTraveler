import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UITestComponent from './UITestComponent.js';
import TestEmitter from '../../../emmiter/TestEmitter';

class UITestContainer extends PureComponent
{
    constructor(props)
    {
        super(props);

        this.state = {
            counter: 0
        };

        TestEmitter.on('TEST_EVENT', this.testHandler, this);
    }

    testHandler()
    {
        const {
            counter: curCounter
        } = this.state;

        this.setState({
            counter: curCounter + 1
        });
    }

    render()
    {
        return (
            <UITestComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect()(UITestContainer);
