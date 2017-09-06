// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App from '../../containers/App';
import Debriefing from '../../components/Debriefing';

const result = shallow(<Debriefing
    goTo = { new App().goTo }
/>);

describe('Debriefing (BDD)', () => {
    test('Must have 1 section element', () => {
        expect(result.find('section').length).toBe(1);
    });
});