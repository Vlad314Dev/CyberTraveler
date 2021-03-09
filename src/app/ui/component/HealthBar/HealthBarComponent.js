import './HealthBarStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class HealthBarComponent extends PureComponent
{
    static propTypes = {
        p1Health: PropTypes.number.isRequired
    };

    render()
    {
        const { 
            p1Health,
        } = this.props;

        const healthBar = Array.from(Array(p1Health).keys());

        return (
            <div block="P1HealthBar" elem="Wrapper">
                {healthBar.map((value, index) => {
                    return <span 
                        block="P1HealthBar" 
                        elem="HealthElem"
                        key={ index }
                    ></span>
                })}
            </div>
        );
    }
}

export default HealthBarComponent;
