/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';

import AuthorizeLogin from '../app/ui/component/AuthorizeLogin';
import AuthorizeLoginComponent from '../app/ui/component/AuthorizeLogin/AuthorizeLoginComponent';

const mockStore = configureMockStore();
const store = mockStore({});

describe('AuthorizeLogin', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <AuthorizeLogin 
                store={ store }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <AuthorizeLogin 
                store={ store }
            />
        ).dive().find('AuthorizeLoginComponent').dive();

        expect(component.getElements()).toMatchSnapshot();
    });

    it('Should update component state on nickname change', () => {
        const container = shallow(
            <AuthorizeLogin 
                store={ store }
            />
        ).dive();
        const component = container.find('AuthorizeLoginComponent').dive();
        const input = component.find('#nickname');
        const testValue = 'test';
        
        input.props().onChange({
            target: {
                value: testValue
            }
        });

        expect(container.state('nickname')).toEqual(testValue);
    });

    it('Should update component state on password change', () => {
        const container = shallow(
            <AuthorizeLogin 
                store={ store }
            />
        ).dive();
        const component = container.find('AuthorizeLoginComponent').dive();
        const input = component.find('#password');
        const testValue = 'test';
        
        input.props().onChange({
            target: {
                value: testValue
            }
        });

        expect(container.state('password')).toEqual(testValue);
    });

    it('Should submit form', () => {
        const testProps = {
            handleSubmit: jest.fn(),
            handleNickname: jest.fn(),
            handlePassword: jest.fn(),
            loading: false
        };
        
        const component = shallow(
            <AuthorizeLoginComponent
                store={ store }
                { ...testProps }
            />
        );
        const nicknameInput = component.find('#nickname');
        const passwordInput = component.find('#password');
        const form = component.find('form');

        nicknameInput.props().onChange({
            target: {
                value: 'test'
            }
        });
        passwordInput.props().onChange({
            target: {
                value: 'test'
            }
        });
        
        form.simulate('submit');

        expect(testProps.handleSubmit).toHaveBeenCalled();
    });
});
