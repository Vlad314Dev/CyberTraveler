import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import UIWrapperComponent from './UIWrapperComponent';

export const mapStateToProps = (state) => ({
    score: state.ScoreReducer.score,
    p1Health: state.P1HealthReducer.p1Health
});

class UIWrapperContainer extends PureComponent
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

export default connect(mapStateToProps, null)(UIWrapperContainer);
