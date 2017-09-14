// Core
import React, { Component } from 'react';
import firebase from '../../firebase';

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
        round:           28,
        scoreMultiplier: 3
    },
    normal: {
        fireDelay:       4,
        round:           20,
        scoreMultiplier: 3
    },
    hard: {
        fireDelay:       5,
        round:           14,
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
        const score = Math.round(timeLeft) * gameCfg[difficulty].scoreMultiplier;
        let newStatus = 'failed';

        if (status === true) {
            newStatus = 'succeeded';
            this._addScore(difficulty, name, score);
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

    _addScore (difficulty, name, score) {
        const scoresRef = firebase.database().ref(`records/${difficulty}`);

        scoresRef.push({ name, score });
    }

    render () {
        const { screen, difficulty, status } = this.state;
        let displayScreen = '';

        switch (screen) {
            case 'home': {
                displayScreen = <Home
                    changeGameProps = { this.changeGameProps }
                    difficulty = { this.state.difficulty }
                    goTo = { this.goTo }
                    name = { this.state.name }
                />;
                break;
            }
            case 'leaderboard': {
                displayScreen = <Leaderboard goTo = { this.goTo } />;
                break;
            }
            case 'briefing': {
                displayScreen = <Briefing
                    goTo = { this.goTo }
                    name = { this.state.name }
                />;
                break;
            }
            case 'gamefield': {
                displayScreen = <Gamefield
                    endGame = { this.endGame }
                    fireDelay = { gameCfg[difficulty].fireDelay }
                    goTo = { this.goTo }
                    round = { gameCfg[difficulty].round }
                />;
                break;
            }
            case 'debriefing': {
                displayScreen = <Debriefing
                    goTo = { this.goTo }
                    status = { status }
                />;
                break;
            }
            default: {
                displayScreen = null;
                break;
            }
        }

        return (
            <section className = { Styles.app }>
                { displayScreen }
            </section>
        );
    }
}
