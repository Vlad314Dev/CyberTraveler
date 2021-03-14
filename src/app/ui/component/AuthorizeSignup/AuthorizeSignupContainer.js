import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import AuthorizeSignupComponent from './AuthorizeSignupComponent';

class AuthorizeSignupContainer extends PureComponent
{
    containerFunctions = {
        handleSubmit: this.handleSubmit.bind(this)
    };
    
    handleSubmit(data)
    {
        console.log(this, data);
    }

    render()
    {
        return (
            <AuthorizeSignupComponent 
                { ...this.props }
                { ...this.state }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, null)(AuthorizeSignupContainer);
