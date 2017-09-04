// Core
import React from 'react';
import { render } from 'enzyme';

// Tested object
import { gameCfg } from '../../containers/App';
import Char from '../../components/Char';

const { fireDelay } = gameCfg.easy;
const props = {
    type: 'player'
};
const result = render(<Char
    type = { props.type }
/>);

describe('Char (BDD)', () => {
    test('type prop is mandatory', () => {
        expect(result.props().name).toEqual('Success!');
    });
});