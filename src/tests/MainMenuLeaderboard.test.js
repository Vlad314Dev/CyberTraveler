/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import MainMenuLeaderboardComponent from '../app/ui/component/MainMenuLeaderboard/MainMenuLeaderboardComponent';

describe('MainMenuLeaderboard', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <MainMenuLeaderboardComponent 
                setActiveOption={ jest.fn() }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <MainMenuLeaderboardComponent 
                setActiveOption={ jest.fn() }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
