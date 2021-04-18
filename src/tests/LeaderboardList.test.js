/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import LeaderboardList from '../app/ui/component/LeaderboardList';

const mockStore = configureMockStore();
const store = mockStore({});

describe('LeaderboardListComponent', () => {
    it('Should render leaderboard list', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <Provider store={ store }>
                <LeaderboardList/>
            </Provider>
        );
    })
});