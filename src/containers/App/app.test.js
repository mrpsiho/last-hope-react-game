// Core
import React from 'react';
import { shallow } from 'enzyme';

// Tested object
import App, { gameCfg } from '../../containers/App';

const state = {
    difficulty: 'easy',
    name:       '',
    screen:     'home'
};
const result = shallow(<App />);

describe('App (BDD)', () => {
    test('Initial state check', () => {
        expect(result.state()).toEqual(state);
    });

    test('Must have Home component at the beginning', () => {
        const { name, difficulty } = state;

        expect(result.contains(
            <Home
                difficulty = { difficulty }
                goToBriefing = { new App().goToBriefing }
                goToLeaderboard = { new App().goToLeaderboard }
                name = { name }
            />
        )).toEqual(true);
    });

    test('Mount Leaderboard when screen state changed to' +
        '"leaderboard"', () => {
        result.setState({
            screen: 'leaderboard'
        });

        expect(result.contains(<Leaderboard />)).toEqual(true);
    });

    test('Mount Briefing when screen state changed to' +
        '"briefing"', () => {
        const { name, difficulty } = state;

        result.setState({
            screen: 'briefing'
        });

        expect(result.contains(
            <Briefing
                difficulty = { gameCfg[difficulty] }
                name = { name }
            />
        )).toEqual(true);
    });

    test('Mount Gamefield when screen state changed to' +
        '"gamefield"', () => {
        const { name, difficulty } = state;

        result.setState({
            screen: 'gamefield'
        });

        expect(result.contains(
            <Gamefield
                difficulty = { gameCfg[difficulty] }
                name = { name }
            />
        )).toEqual(true);
    });

    test('Mount Debriefing when screen state changed to' +
        '"debriefing"', () => {
        result.setState({
            screen: 'debriefing'
        });

        expect(result.contains(
            <Debriefing />
        )).toEqual(true);
    });
});