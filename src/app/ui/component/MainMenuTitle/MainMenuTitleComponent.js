import './MainMenuTitleStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class MainMenuTitleComponent extends PureComponent
{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        nickname: PropTypes.string,
    }

    static defaultProps = {
        nickname: ''
    }

    renderNickname()
    {
        const {
            isLoggedIn,
            nickname
        } = this.props;

        if (isLoggedIn) {
            return (
                <div block="MainMenuTitle" elem="Nickname">
                    <span block="MainMenuTitle" elem="Value">{ `Welcome ${ nickname }` }</span>
                </div>
            );
        }

        return null;
    }

    render()
    {
        return (
            <div block="MainMenuTitle">
                <div block="MainMenuTitle" elem="General">
                    <span block="MainMenuTitle" elem="Value">Cyber Traveler</span>
                </div>
                { this.renderNickname() }
            </div>
        );
    }
}

export default MainMenuTitleComponent;
