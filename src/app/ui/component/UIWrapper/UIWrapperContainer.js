import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UIWrapperComponent from './UIWrapperComponent.js';

export const mapStateToProps = (state) => ({
    score: state.ScoreReducer.score 
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
