// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App from '../../containers/App';
import Gameover from '../../components/Gameover';

const result = shallow(<Gameover
    goToHome = { new App().goToHome }
/>);

describe('Gameover (BDD)', () => {
    test('Must have 1 section element', () => {
        expect(result.find('section').length).toBe(1);
    });
});