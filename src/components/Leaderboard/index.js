// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.scss';
import { getUniqueID } from '../../helpers';

// Components
import BadgeGenericDoubleSided from '../../elements/BadgeGenericDoubleSided';
import BadgeEasy from '../../elements/BadgeEasy';
import BadgeNormal from '../../elements/BadgeNormal';
import BadgeHard from '../../elements/BadgeHard';

export default class Leaderboard extends Component {
    static propTypes = {
        goTo: PropTypes.func.isRequired
    };

    constructor () {
        super();

        this.clickOnHomeBtn = ::this._clickOnHomeBtn;
    }

    state = {
        records: {
            easy:   [],
            normal: [],
            hard:   []
        }

    };

    _clickOnHomeBtn () {
        this.props.goTo('home');
    }

    render () {
        const { easy, normal, hard } = this.state.records;
        const listEasy = easy.map(({ name, score }) => {
            const i = getUniqueID(5);

            return <li key = { i }>{ name }<span>{ score }</span></li>;
        });
        const listNormal = normal.map(({ name, score }) => {
            const i = getUniqueID(5);

            return <li key = { i }>{ name }<span>{ score }</span></li>;
        });
        const listHard = hard.map(({ name, score }) => {
            const i = getUniqueID(5);

            return <li key = { i }>{ name }<span>{ score }</span></li>;
        });

        return (
            <section className = { Styles.leaderboard }>
                <div className = { Styles.scoresBg }>
                    <div className = { Styles.scoresBg1 } />
                    <div className = { Styles.scoresBg2 } />
                    <div className = { Styles.scoresBg3 } />
                    <div className = { Styles.scoresBgFg } />
                </div>
                <BadgeGenericDoubleSided
                    customClass = { Styles.badge }
                />
                <h1>Scores</h1>
                <BadgeEasy customClass = { Styles.badgeEasy } />
                <BadgeNormal customClass = { Styles.badgeNormal } />
                <BadgeHard customClass = { Styles.badgeHard } />
                <div className = { Styles.lists }>
                    <ul>{ listEasy }</ul>
                    <ul>{ listNormal }</ul>
                    <ul>{ listHard }</ul>
                </div>
                <button
                    className = { Styles.homeBtn }
                    onClick = { this.clickOnHomeBtn }>
                    Home
                </button>
            </section>
        );
    }
}
