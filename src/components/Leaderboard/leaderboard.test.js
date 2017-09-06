// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App from '../../containers/App';
import Leaderboard from '../../components/Leaderboard';
import BadgeGenericDoubleSided from '../../elements/BadgeGenericDoubleSided';
import BadgeEasy from '../../elements/BadgeEasy';
import BadgeNormal from '../../elements/BadgeNormal';
import BadgeHard from '../../elements/BadgeHard';

// test state
// state = {
//     records: {
//         easy: [
//             { name: 'Devastator', score: 25 },
//             { name: 'Kittie', score: 15 },
//             { name: 'N00b', score: 12 },
//             { name: 'Long name with numbers and so on', score: 5 }
//         ],
//         normal: [
//             { name: 'Devastator', score: 25 },
//             { name: 'N00b', score: 12 },
//             { name: 'Long name with numbers and so on', score: 5 },
//             { name: 'Kittie', score: 1 }
//         ],
//         hard: [
//             { name: 'Devastator', score: 25 },
//             { name: 'Long name with numbers and so on', score: 25 },
//             { name: 'N00b', score: 12 },
//             { name: 'Kittie', score: 5 }
//         ]
//     }
//
// };

const result = shallow(<Leaderboard
    goTo = { new App().goTo }
/>);

describe('Leaderboard (TDD)', () => {
    test('Must have 1 section element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Must have 1 section element', () => {
        expect(result.find(BadgeGenericDoubleSided).length).toBe(1);
    });

    test('Must have 1 section element', () => {
        expect(result.find(BadgeEasy).length).toBe(1);
    });

    test('Must have 1 section element', () => {
        expect(result.find(BadgeNormal).length).toBe(1);
    });

    test('Must have 1 section element', () => {
        expect(result.find(BadgeHard).length).toBe(1);
    });

    test('Must have 3 ul elements', () => {
        expect(result.find('ul').length).toBe(3);
    });

    test('Must have 1 button element', () => {
        expect(result.find('button').length).toBe(1);
    });

    test('goTo prop is mandatory', () => {
        const type = typeof result.instance().props.goTo;

        expect(type).toEqual('function');
    });
});
