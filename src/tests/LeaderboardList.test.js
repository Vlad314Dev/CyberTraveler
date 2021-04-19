/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import LeaderboardListComponent from '../app/ui/component/LeaderboardList/LeaderboardListComponent';

describe('LeaderboardList', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <LeaderboardListComponent 
                loading={ false }
                data={ {
                    getLeaderboard: []
                } }
                error={ '' }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <LeaderboardListComponent 
                loading={ false }
                data={ {
                    getLeaderboard: []
                } }
                error={ '' }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
