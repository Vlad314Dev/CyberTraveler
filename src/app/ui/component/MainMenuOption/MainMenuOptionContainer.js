import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import MainMenuOptionComponent from './MainMenuOptionComponent';

class MainMenuOptionContainer extends PureComponent
{   
    render()
    {
        return (
            <MainMenuOptionComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(null, null)(MainMenuOptionContainer);
