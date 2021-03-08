import './UIWrapperStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class UIWrapperComponent extends PureComponent
{
    static propTypes = {
        score: PropTypes.number.isRequired,
        p1Health: PropTypes.number.isRequired,
        debugData: PropTypes.object
    };

    renderP1Score()
    {
        const {
            score
        } = this.props;

        return (
            <div block="UI" elem="Score">
                <span block="Score" elem="Value">{ `Score ${ score }` }</span>
            </div>
        );
    }

    renderP1Health()
    {
        const { 
            p1Health,
        } = this.props;

        const healthBar = Array.from(Array(p1Health).keys());

        return (
            <div block="UI" elem="P1HealthBar">
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

    renderP1Weapons()
    {
        return (
            <div block="UI" elem="Weapons">
                <div block="Weapons" elem="List">
                    <div block="Weapons" elem="Available" mods={ { type: 'default' } }>

                    </div>
                </div>
            </div>
        );
    }

    render()
    {
        return (
            <div block="UIWrapper">
                { this.renderP1Score() }
                { this.renderP1Health() }
                { this.renderP1Weapons() }
            </div>
        );
    }
}

export default UIWrapperComponent;
