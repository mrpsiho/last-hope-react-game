// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App from '../../containers/App';
import Briefing from '../../components/Briefing';

const state = {
    name: 'Vitalii'
};
const result = shallow(<Briefing
    goToGamefield = { new App().goToBriefing }
    name = { state.name }
/>);

describe('Home (BDD)', () => {
    test('Name prop is mandatory', () => {
        expect(result.props().name).toEqual('Success!');
    });

    test('Must have 1 section element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Must have a div with logo/name', () => {
        expect(result.find('div.brief').length).toBe(1);
    });
});