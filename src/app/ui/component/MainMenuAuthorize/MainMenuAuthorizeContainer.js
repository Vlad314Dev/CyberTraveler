import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setActiveOption } from 'UIStore/MainMenu/MainMenuAction';
import { 
    BACK_OPTION,
    DEFAULT_OPTION
} from 'UIStore/MainMenu/MainMenuConfig';

import MainMenuAuthorizeComponent from './MainMenuAuthorizeComponent';

export const mapDispatchToProps = (dispatch) => ({
    setActiveOption: (optionName) => dispatch(setActiveOption(optionName))
});

export const mapStateToProps = (state) => ({
    activeOption: state.MainMenuReducer.activeOption
});

class MainMenuAuthorizeContainer extends PureComponent
{
    static propTypes = {
        setActiveOption: PropTypes.func.isRequired
    };

    containerFunctions = {
        setActiveOption: this.setActiveOption.bind(this)
    }

    setActiveOption(optionName) {
        const { setActiveOption } = this.props;

        if (optionName === BACK_OPTION) {
            setActiveOption(DEFAULT_OPTION);
        } else {
            setActiveOption(optionName);
        }
    }

    render()
    {
        return (
            <MainMenuAuthorizeComponent 
                { ...this.props }
                { ...this.state }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuAuthorizeContainer);
