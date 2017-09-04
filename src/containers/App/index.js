// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';

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

    state = {
        name:       '',
        difficulty: 'easy',
        screen:     'home'
    };

    render () {
        return (
            <section className = { Styles.app }>
                <h1>Lost Hope</h1>
            </section>
        );
    }
}
