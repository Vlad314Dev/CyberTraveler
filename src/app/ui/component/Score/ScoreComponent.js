import './ScoreStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class ScoreComponent extends PureComponent
{
    static propTypes = {
        score: PropTypes.number.isRequired
    };

    render()
    {
        const {
            score
        } = this.props;

        return (
            <div block="Score" elem="Wrapper">
                <span block="Score" elem="Value">{ `Score ${ score }` }</span>
            </div>
        );
    }
}

export default ScoreComponent;
