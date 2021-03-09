import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import UIWrapperComponent from './ScoreComponent';

export const mapStateToProps = (state) => ({
    score: state.ScoreReducer.score
});

class ScoreContainer extends PureComponent
{
    render()
    {
        return (
            <UIWrapperComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, null)(ScoreContainer);
