// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App from '../../containers/App';
import Congrats from '../../components/Congrats';

const result = shallow(<Congrats
    goToHome = { new App().goToHome }
/>);

describe('Congrats (BDD)', () => {
    test('Must have 1 section element', () => {
        expect(result.find('section').length).toBe(1);
    });
});