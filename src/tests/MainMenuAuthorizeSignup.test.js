/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import MainMenuAuthorizeSignupComponent from '../app/ui/component/MainMenuAuthorizeSignup/MainMenuAuthorizeSignupComponent';

describe('MainMenuAuthorizeSignup', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <MainMenuAuthorizeSignupComponent 
                setActiveOption={ jest.fn() }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <MainMenuAuthorizeSignupComponent 
                setActiveOption={ jest.fn() }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
