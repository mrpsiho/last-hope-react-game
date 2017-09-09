// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App from '../../containers/App';
import Debriefing from '../../components/Debriefing';
import Stars from '../../components/elements/Stars';
import Wheel from '../../components/elements/Wheel';

const result = shallow(<Debriefing
    goTo = { new App().goTo }
    status = 'succeeded'
/>);

describe('Debriefing (TDD)', () => {
    test('Must have 1 section element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Must have 1 Stars', () => {
        expect(result.find(Stars).length).toBe(1);
    });

    test('Must have 1 Wheel', () => {
        expect(result.find(Wheel).length).toBe(1);
    });

    test('Must have 1 h2 elements', () => {
        expect(result.find('h2').length).toBe(1);
    });

    test('Must have 1 button element', () => {
        expect(result.find('button').length).toBe(1);
    });

    test('goTo prop is mandatory and must be func', () => {
        const type = typeof result.instance().props.goTo;

        expect(type).toEqual('function');
    });

    test('status prop is mandatory and must be string', () => {
        const type = typeof result.instance().props.status;

        expect(type).toEqual('string');
    });
});
