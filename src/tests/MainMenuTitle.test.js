/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import MainMenuTitleComponent from '../app/ui/component/MainMenuTitle/MainMenuTitleComponent';

describe('MainMenuTitle', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <MainMenuTitleComponent 
                isLoggedIn={ false }
                nickname={ '' }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <MainMenuTitleComponent 
                isLoggedIn={ false }
                nickname={ '' }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
