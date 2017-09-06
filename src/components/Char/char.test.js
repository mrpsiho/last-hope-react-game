// Core
import React from 'react';
import { render } from 'enzyme';

// Tested object
import Char from '../../components/Char';

const props = {
    type: 'player' // ('player'|'ai')
};
const result = render(<Char
    type = { props.type }
/>);

describe('Char (TDD)', () => {
    test('type prop is mandatory', () => {
        const type = typeof result.instance().props.type;

        expect(type).toEqual('string');
    });
});
