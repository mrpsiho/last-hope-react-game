// Core
import React from 'react';
import { render } from 'enzyme';

// Tested object
import App, { gameCfg } from '../../containers/App';
import Gamefield from '../../components/Gamefield';
import Char from '../../components/Char';

const { fireDelay, round } = gameCfg.easy;
const props = {
    fireDelay,
    name: 'Vitalii',
    round
};
const state = {
    chars: {
        player: {
            fireCounter: 0,
            hp:          10,
            position:    0 // getElementById(); element.style.top
        },
        ai: {
            fireCounter: 0,
            hp:          10,
            position:    0
        }
    },
    playing: true,
    timer:   props.round,
    score:   0,
    status:  ''
};
const result = render(<Gamefield
    endGame = { new App().endGame }
    fireDelay = { props.fireDelay }
    name = { props.name }
    round = { props.round }
/>);

describe('Gamefield (BDD)', () => {
    test('fireDelay prop is mandatory', () => {
        expect(result.props().fireDelay).toEqual('Success!');
    });

    test('name prop is mandatory', () => {
        expect(result.props().name).toEqual('Success!');
    });

    test('round prop is mandatory', () => {
        expect(result.props().round).toEqual('Success!');
    });

    test('Initial state check', () => {
        expect(result.state()).toEqual(state);
    });

    test('Must have 1 section element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Must have player Char and AI Char', () => {
        expect(result.contains([
            <Char
                type = { 'player' }
            />,
            <Char
                type = { 'ai' }
            />
        ])).toEqual(true);
    });
});