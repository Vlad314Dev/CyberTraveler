import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UIComponent from './UIComponent.js';

export const mapStateToProps = (state) => ({
    score: state.ScoreReducer.score 
});

class UIContainer extends PureComponent
{
    render()
    {
        return (
            <UIComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, null)(UIContainer);
