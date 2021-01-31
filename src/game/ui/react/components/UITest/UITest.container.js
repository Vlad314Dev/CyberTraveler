import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UITest from './UITest.component.js';
import { TestEmitter } from '../../../../emmiters/TestEmitter.js';

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
            <UITest 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect()(UITestContainer);
