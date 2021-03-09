import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import UIWrapperComponent from './UIWrapperComponent';

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

export default connect(null, null)(UIWrapperContainer);
