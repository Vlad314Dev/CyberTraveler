/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import MainMenuAuthorizeLoginComponent from '../app/ui/component/MainMenuAuthorizeLogin/MainMenuAuthorizeLoginComponent';

describe('MainMenuAuthorizeLogin', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <MainMenuAuthorizeLoginComponent 
                activeOption={ 'AUTHORIZE_OPTION' }
                setActiveOption={ jest.fn() }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <MainMenuAuthorizeLoginComponent 
                activeOption={ 'AUTHORIZE_OPTION' }
                setActiveOption={ jest.fn() }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
