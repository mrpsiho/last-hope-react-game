// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';

// Instruments
import Styles from './styles.scss';
import { getUniqueID } from '../../helpers';

// Components
import BadgeGenericDoubleSided from '../../components/elements/BadgeGenericDoubleSided';
import BadgeEasy from '../../components/elements/BadgeEasy';
import BadgeNormal from '../../components/elements/BadgeNormal';
import BadgeHard from '../../components/elements/BadgeHard';

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

    componentWillMount () {
        const recordsRef = firebase.database().ref('records');

        recordsRef.on('value', (snapshot) => {
            const records = snapshot.val();
            const newRecords = {
                easy:   [],
                normal: [],
                hard:   []
            };

            for (const group in records) {  // eslint-disable-line
                for (const key in records[group]) { //eslint-disable-line
                    const tempObj = {
                        name:  records[group][key].name,
                        score: records[group][key].score
                    };

                    newRecords[group].push(tempObj);
                }
                newRecords[group].reverse();
            }
            this.setState({ records: newRecords });
        });
    }

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
