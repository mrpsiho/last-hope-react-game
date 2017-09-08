// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';

// Components
import Home from '../../components/Home';
import Leaderboard from '../../components/Leaderboard';
import Briefing from '../../components/Briefing';
import Gamefield from '../../components/Gamefield';
import Debriefing from '../../components/Debriefing';

export const gameCfg = {
    easy: {
        fireDelay:       4,
        round:           30,
        scoreMultiplier: 3
    },
    normal: {
        fireDelay:       4,
        round:           18,
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
        screen:     'home',
        status:     ''
    };

    _changeGameProps = ({ difficulty, name }) => {
        this.setState(({ screen, status }) =>
            ({ difficulty, name, screen, status })
        );
    };

    _goTo = (screen) => {
        this.setState(({ difficulty, name, status }) =>
            ({ difficulty, name, screen, status })
        );
    };

    _endGame (status, timeLeft) {
        const { difficulty, name } = this.state;
        const score = timeLeft*gameCfg[difficulty].scoreMultiplier;
        let newStatus = 'failed';

        if (status === true) {
            newStatus = 'succeeded';
            this._addScore(name, score);
        }
        this.setState(
            {
                difficulty,
                name:   '',
                screen: 'debriefing',
                status: newStatus
            }
        );
    }

    _addScore (name, score) {
        console.log('score:', name, score);
    }

    render () {
        const { screen, difficulty, status } = this.state;

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
        const debriefing = screen === 'debriefing'
            ? <Debriefing
                goTo = { this.goTo }
                status = { status }
            />
            : null;

        return (
            <section className = { Styles.app }>
                { home }
                { leaderboard }
                { briefing }
                { gamefield }
                { debriefing }
            </section>
        );
    }
}
