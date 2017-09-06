// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App from '../../containers/App';
import Briefing from '../../components/Briefing';

const props = {
    name: 'Vitalii'
};
const result = shallow(<Briefing
    goToGamefield = { new App().goToBriefing }
    name = { props.name }
/>);

describe('Briefing (TDD)', () => {
    test('Name prop is mandatory', () => {
        expect(result.props().name).toEqual('Success!');
    });

    test('Must have 1 section element', () => {
        expect(result.find('section').length).toBe(1);
    });
});
