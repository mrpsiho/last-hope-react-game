// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App, { gameCfg } from '../../containers/App';
import Gamefield from '../../components/Gamefield';
import Char from '../../components/Char';
import TreeOne from '../../components/elements/TreeOne';
import TreeTwo from '../../components/elements/TreeTwo';
import Timer from '../../components/elements/Timer';

const { fireDelay, round } = gameCfg.easy;
const props = {
    fireDelay,
    round
};
const state = {
    player: {
        fireCounter: 0, // reloading counter
        hp:          10, // heal points
        position:    430 // getElementById(); element.style.top
    },
    playerBullet: {
        fired: false,
        x:     190,
        y:     0
    },
    ai: {
        fireCounter: 0,
        hp:          10,
        position:    430,
        direction:   'up'
    },
    aiBullet: {
        fired: false,
        x:     760
    },
    timer: round // seconds left
};
const result = shallow(<Gamefield
    endGame = { new App().endGame }
    fireDelay = { props.fireDelay }
    goTo = { new App().goTo }
    round = { props.round }
/>);

describe('Gamefield (TDD)', () => {
    test('endGame prop is mandatory', () => {
        const type = typeof result.instance().props.endGame;

        expect(type).toEqual('function');
    });

    test('fireDelay prop is mandatory', () => {
        const type = typeof result.instance().props.fireDelay;

        expect(type).toEqual('number');
    });

    test('goTo prop is mandatory', () => {
        const type = typeof result.instance().props.goTo;

        expect(type).toEqual('function');
    });

    test('round prop is mandatory', () => {
        const type = typeof result.instance().props.round;

        expect(type).toEqual('number');
    });

    test('Initial state check', () => {
        expect(result.state()).toEqual(state);
    });

    test('Must have 1 section element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Must have 2 chars', () => {
        expect(result.find(Char).length).toBe(2);
    });

    test('Must have 1 tree One', () => {
        expect(result.find(TreeOne).length).toBe(1);
    });

    test('Must have 1 tree Two', () => {
        expect(result.find(TreeTwo).length).toBe(1);
    });

    test('Must have 1 timer', () => {
        expect(result.find(Timer).length).toBe(1);
    });

    test('Must have 1 button', () => {
        expect(result.find('button').length).toBe(1);
    });
});
