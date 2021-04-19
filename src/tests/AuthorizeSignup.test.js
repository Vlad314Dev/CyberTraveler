/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';

import AuthorizeSignup from '../app/ui/component/AuthorizeSignup';
import AuthorizeSignupComponent from '../app/ui/component/AuthorizeSignup/AuthorizeSignupComponent';

const mockStore = configureMockStore();
const store = mockStore({});

describe('AuthorizeSignup', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <AuthorizeSignup 
                store={ store }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <AuthorizeSignup 
                store={ store }
            />
        ).dive().find('AuthorizeSignupComponent').dive();

        expect(component.getElements()).toMatchSnapshot();
    });

    it('Should update component state on nickname change', () => {
        const container = shallow(
            <AuthorizeSignup 
                store={ store }
            />
        ).dive();
        const component = container.find('AuthorizeSignupComponent').dive();
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
            <AuthorizeSignup 
                store={ store }
            />
        ).dive();
        const component = container.find('AuthorizeSignupComponent').dive();
        const input = component.find('#password');
        const testValue = 'test';
        
        input.props().onChange({
            target: {
                value: testValue
            }
        });

        expect(container.state('password')).toEqual(testValue);
    });

    it('Should update component state on password repeat change', () => {
        const container = shallow(
            <AuthorizeSignup 
                store={ store }
            />
        ).dive();
        const component = container.find('AuthorizeSignupComponent').dive();
        const input = component.find('#password_repeat');
        const testValue = 'test';
        
        input.props().onChange({
            target: {
                value: testValue
            }
        });

        expect(container.state('passwordRepeat')).toEqual(testValue);
    });

    it('Should submit form', () => {
        const testProps = {
            handleSubmit: jest.fn(),
            handleNickname: jest.fn(),
            handlePassword: jest.fn(),
            handlePasswordRepeat: jest.fn(),
            loading: false
        };
        
        const component = shallow(
            <AuthorizeSignupComponent
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

    it('Should show alert on form validation error', async () => {
        const container = shallow(
            <AuthorizeSignup 
                store={ store }
            />
        ).dive();
        const component = container.find('AuthorizeSignupComponent').dive();
        const nicknameInput = component.find('#nickname');
        const passwordInput = component.find('#password');
        const passwordRepeatInput = component.find('#password_repeat');
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
        passwordRepeatInput.props().onChange({
            target: {
                value: 'test'
            }
        });

        window.alert = jest.fn();
        await form.props().onSubmit({ preventDefault: jest.fn() });

        expect(window.alert).toHaveBeenCalled();
    });
});
