import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './UITestStyle.scss';

class UITestComponent extends PureComponent
{
    static propTypes = {
        counter: PropTypes.number.isRequired
    };

    render()
    {
        const { counter } = this.props;
        
        return(
            <div block="UI">TEST UI Counter: { counter }</div>
        );
    }
}

export default UITestComponent;
