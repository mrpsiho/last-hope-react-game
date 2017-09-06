// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App, { gameCfg } from '../../containers/App';
import Home from '../../components/Home';
import Leaderboard from '../../components/Leaderboard';
import Briefing from '../../components/Briefing';
import Gamefield from '../../components/Gamefield';
import Debriefing from '../../components/Debriefing';

const state = {
    difficulty: 'easy',
    name:       '',
    screen:     'home'
};
const newDifficulty = 'normal';
const newName = 'Vitalii';
const newState = {
    difficulty: newDifficulty,
    name:       newName,
    screen:     'home'
};
const result = shallow(<App />);

describe('App (BDD)', () => {
    test('Initial state check', () => {
        expect(result.state()).toEqual(state);
    });

    test('Must have Home component at the beginning', () => {
        expect(result.find(Home).length).toBe(1);
    });

    test('Mount Leaderboard when screen state changed to' +
        '"leaderboard"', () => {
        result.setState({
            screen: 'leaderboard'
        });

        expect(result.find(Leaderboard).length).toBe(1);
    });

    test('Mount Briefing when screen state changed to' +
        '"briefing"', () => {
        result.setState({
            screen: 'briefing'
        });

        expect(result.find(Briefing).length).toBe(1);
    });

    test('Mount Gamefield when screen state changed to' +
        '"gamefield"', () => {
        result.setState({
            screen: 'gamefield'
        });

        expect(result.find(Gamefield).length).toBe(1);
    });

    test('Mount Debriefing when screen state changed to' +
        '"debriefing"', () => {
        result.setState({
            screen: 'debriefing'
        });
        expect(result.find(Debriefing).length).toBe(1);
    });
});

/*describe('App (TDD)', () => {
});*/
