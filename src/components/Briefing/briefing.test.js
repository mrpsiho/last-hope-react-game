// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App from '../../containers/App';
import Briefing from '../../components/Briefing';
import BadgeGenericTrapezium from '../../components/elements/BadgeGenericTrapezium';
import Rogers from '../../components/elements/Rogers';
import Wheel from '../../components/elements/Wheel';

const props = {
    name: 'Vitalii'
};
const result = shallow(<Briefing
    goTo = { new App().goTo }
    name = { props.name }
/>);

describe('Briefing (TDD)', () => {
    test('Must have 1 section element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Must have 1 Wheel', () => {
        expect(result.find(Wheel).length).toBe(1);
    });

    test('Must have 1 BadgeGenericTrapezium', () => {
        expect(result.find(BadgeGenericTrapezium).length).toBe(1);
    });

    test('Must have 1 h2 element', () => {
        expect(result.find('h2').length).toBe(1);
    });

    test('Must have 1 div', () => {
        expect(result.find('div').length).toBe(1);
    });

    test('Must have 1 paragraph', () => {
        expect(result.find('p').length).toBe(1);
    });

    test('Must have 1 Rogers', () => {
        expect(result.find(Rogers).length).toBe(1);
    });

    test('Must have 1 button', () => {
        expect(result.find('button').length).toBe(1);
    });

    test('goTo prop is mandatory and must be func', () => {
        const type = typeof result.instance().props.goTo;

        expect(type).toEqual('function');
    });

    test('name prop is mandatory and must be a string', () => {
        const type = typeof result.instance().props.name;

        expect(type).toEqual('string');
    });
});
