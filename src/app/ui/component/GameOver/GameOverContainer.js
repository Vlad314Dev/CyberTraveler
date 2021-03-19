import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import GameOverComponent from './GameOverComponent';

export const mapStateToProps = (state) => ({
    score: state.ScoreReducer.score
});

class GameOverContainer extends PureComponent
{
    render()
    {
        return (
            <GameOverComponent
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, null)(GameOverContainer);
