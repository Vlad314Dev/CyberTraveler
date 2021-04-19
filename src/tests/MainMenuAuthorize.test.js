/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import MainMenuAuthorizeComponent from '../app/ui/component/MainMenuAuthorize/MainMenuAuthorizeComponent';

describe('MainMenuAuthorize', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <MainMenuAuthorizeComponent 
                activeOption={ 'AUTHORIZE_OPTION' }
                setActiveOption={ jest.fn() }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <MainMenuAuthorizeComponent 
                activeOption={ 'AUTHORIZE_OPTION' }
                setActiveOption={ jest.fn() }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
