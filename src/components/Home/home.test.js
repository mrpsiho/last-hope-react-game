// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App from '../../containers/App';
import Home from '../../components/Home';

const state = {
    difficulty: 'easy',
    name:       ''
};
const newDifficulty = 'hard';
const newName = 'Vitalii';
const newState = {
    difficulty: newDifficulty,
    name:       newName
};
const result = shallow(<Home
    difficulty = { state.difficulty }
    goToBriefing = { new App().goToBriefing }
    goToLeaderboard = { new App().goToLeaderboard }
    name = { state.name }
/>);

describe('Home (BDD)', () => {
    test('Initial state check', () => {
        expect(result.state()).toEqual(state);
    });

    test('Must have 1 section element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Must have a div with logo/name', () => {
        expect(result.find('div.logo').length).toBe(1);
    });

    test('Must have 1 input type text', () => {
        expect(result.find('input[type=text]').length).toBe(1);
    });

    test('Must have 1 input type radio', () => {
        expect(result.find('input[type=radio]').length).toBe(1);
    });

    test('Must have 2 buttons', () => {
        expect(result.find('input[type=button]').length).toBe(1);
    });

    test('Must respond to state change', () => {
        result.setState({
            difficulty: newDifficulty,
            name:       newName
        });

        expect(result.state()).toEqual(newState);
    });
});