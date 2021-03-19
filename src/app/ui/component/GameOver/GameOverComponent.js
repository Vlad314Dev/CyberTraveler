import './GameOverStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class GameOverComponent extends PureComponent
{
    static propTypes = {
        score: PropTypes.number.isRequired
    }

    render()
    {
        const {
            score
        } = this.props;

        return (
            <div block="GameOver">
                <div block="GameOver" elem="Main">
                    <h1>Congratulations, you have completed the game!</h1>
                    <h2>{`Your score: ${ score }`}</h2>
                </div>
                <div block="GameOver" elem="CreditsWrapper">
                    <h1>Credits</h1>
                    <div block="GameOver" elem="Credits">
                        <div block="GameOver" elem="Section">
                            <h2>Art</h2>
                            <p>Luis Zuno (www.ansimuz.com)</p>
                        </div>
                        <div block="GameOver" elem="Section">
                            <h2>Music</h2>
                            <p>Luis Zuno (www.ansimuz.com)</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameOverComponent;
