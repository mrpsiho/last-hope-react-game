// Core
import React from 'react';
import { render } from 'enzyme';

// Tested object
import App, { gameCfg } from '../../containers/App';
import Gamefield from '../../components/Gamefield';
import Char from '../../components/Char';
import TreeOne from '../../elements/TreeOne';
import TreeTwo from '../../elements/TreeTwo';
import Timer from '../../elements/Timer';

const { fireDelay, round } = gameCfg.easy;
const props = {
    fireDelay,
    round
};
const state = {
    chars: {
        player: {
            fireCounter: 0, // reloading counter
            hp:          10, // heal points
            position:    0 // getElementById(); element.style.top
        },
        ai: {
            fireCounter: 0,
            hp:          10,
            position:    0
        }
    },
    playing: true, // game status
    timer:   props.round, // seconds left
    status:  '' // result status ('success'|'fail')
};
const result = render(<Gamefield
    endGame = { new App().endGame }
    fireDelay = { props.fireDelay }
    goTo = { new App().goTo }
    round = { props.round }
/>);

describe('Gamefield (BDD)', () => {
    test('endGame prop is mandatory', () => {
        const type = typeof result.instance().props.endGame;

        expect(type).toEqual('function');
    });

    test('fireDelay prop is mandatory', () => {
        const type = typeof result.instance().props.fireDelay;

        expect(type).toEqual('integer');
    });

    test('goTo prop is mandatory', () => {
        const type = typeof result.instance().props.goTo;

        expect(type).toEqual('function');
    });

    test('round prop is mandatory', () => {
        const type = typeof result.instance().props.round;

        expect(type).toEqual('integer');
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
