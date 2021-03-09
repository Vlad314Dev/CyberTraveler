import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import HealthBarComponent from './HealthBarComponent';

export const mapStateToProps = (state) => ({
    p1Health: state.P1HealthReducer.p1Health
});

class HealthBarContainer extends PureComponent
{
    render()
    {
        return (
            <HealthBarComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, null)(HealthBarContainer);
