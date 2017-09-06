// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.scss';

export default class Gamefield extends Component {
    static propTypes = {
        endGame:   PropTypes.func.isRequired,
        fireDelay: PropTypes.number.isRequired,
        goTo:      PropTypes.func.isRequired,
        round:     PropTypes.number.isRequired
    };

    constructor () {
        super();

        this.clickOnHomeBtn = ::this._clickOnHomeBtn;
    }

    _clickOnHomeBtn () {
        this.props.goTo('home');
    }

    render () {
        return (
            <section className = { Styles.gamefield }>
                <button
                    className = { Styles.homeBtn }
                    onClick = { this.clickOnHomeBtn }>
                    Home
                </button>
            </section>
        );
    }
}
