// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App from '../../containers/App';
import Home from '../../components/Home';
import Wheel from '../../elements/Wheel';
import WheelOverlay from '../../elements/WheelOverlay';
import Protagonist from '../../elements/Protagonist';
import DifficultySelect from '../../components/DifficultySelect';

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
    changeGameProps = { new App().changeGameProps }
    difficulty = { state.difficulty }
    goTo = { new App().goTo }
    name = { state.name }
/>);

describe('Home (TDD)', () => {
    // test('Initial state check', () => {
    //     expect(result.state()).toEqual(state);
    // });

    test('Must have 1 section element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Must have 1 Wheel component', () => {
        expect(result.find(Wheel).length).toBe(1);
    });

    test('Must have 1 WheelOverlay component', () => {
        expect(result.find(WheelOverlay).length).toBe(1);
    });

    test('Must have 1 Protagonist component', () => {
        expect(result.find(Protagonist).length).toBe(1);
    });

    test('Must have 1 H1', () => {
        expect(result.find('h1').length).toBe(1);
    });

    test('Must have 1 input', () => {
        expect(result.find('input').length).toBe(1);
    });

    test('Must have 2 labels', () => {
        expect(result.find('label').length).toBe(2);
    });

    test('Must have difficulty select component', () => {
        expect(result.find(DifficultySelect).length).toBe(1);
    });

    test('Must have 2 buttons', () => {
        expect(result.find('button').length).toBe(2);
    });

    test('changeGameProps prop is mandatory', () => {
        const type = typeof result.instance().props.changeGameProps;

        expect(type).toEqual('function');
    });

    test('difficulty prop is mandatory', () => {
        const type = typeof result.instance().props.difficulty;

        expect(type).toEqual('string');
    });

    test('goTo prop is mandatory', () => {
        const type = typeof result.instance().props.goTo;

        expect(type).toEqual('function');
    });

    test('name prop is mandatory', () => {
        const type = typeof result.instance().props.name;

        expect(type).toEqual('string');
    });

    // test('Click on Leaderboard button', () => {
    //     result.instance().mockClickLeader = jest.fn();
    //     result.update();
    //     result.find('button').first().simulate('click');
    //     expect(result.instance().mockClickLeader).toHaveBeenCalled();
    // });
});
