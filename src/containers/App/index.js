// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';

// Components
import Home from '../../components/Home';
import Leaderboard from '../../components/Leaderboard';
import Briefing from '../../components/Briefing';
import Gamefield from '../../components/Gamefield';

export const gameCfg = {
    easy: {
        fireDelay:       2,
        round:           30,
        scoreMultiplier: 3
    },
    normal: {
        fireDelay:       3,
        round:           20,
        scoreMultiplier: 3
    },
    hard: {
        fireDelay:       5,
        round:           12,
        scoreMultiplier: 3
    }
};

export default class App extends Component {
    constructor () {
        super();

        this.changeGameProps = ::this._changeGameProps;
        this.goTo = ::this._goTo;
        this.endGame = ::this._endGame;
    }

    state = {
        difficulty: 'easy',
        name:       '',
        screen:     'gamefield'
    };

    _changeGameProps = ({ difficulty, name }) => {
        this.setState({ difficulty, name });
    };

    _goTo = (screen) => {
        this.setState({ screen });
    };

    _endGame () {
        return false;
    }

    render () {
        const { screen, difficulty } = this.state;

        const home = screen === 'home'
            ? <Home
                changeGameProps = { this.changeGameProps }
                difficulty = { this.state.difficulty }
                goTo = { this.goTo }
                name = { this.state.name }
            />
            : null;
        const leaderboard = screen === 'leaderboard'
            ? <Leaderboard goTo = { this.goTo } />
            : null;
        const briefing = screen === 'briefing'
            ? <Briefing name = { this.state.name } />
            : null;
        const gamefield = screen === 'gamefield'
            ? <Gamefield
                endGame = { this.endGame }
                fireDelay = { gameCfg[difficulty].fireDelay }
                goTo = { this.goTo }
                round = { gameCfg[difficulty].round }
            />
            : null;

        return (
            <section className = { Styles.app }>
                { home }
                { leaderboard }
                { briefing }
                { gamefield }
            </section>
        );
    }
}
