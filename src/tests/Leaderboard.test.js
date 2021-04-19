/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import LeaderboardComponent from '../app/ui/component/Leaderboard/LeaderboardComponent';

describe('Leaderboard', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <LeaderboardComponent/>
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <LeaderboardComponent/>
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
