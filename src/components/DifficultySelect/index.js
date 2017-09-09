// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.scss';

// Components
import BadgeEasy from '../../components/elements/BadgeEasy';
import BadgeNormal from '../../components/elements/BadgeNormal';
import BadgeHard from '../../components/elements/BadgeHard';

export default class DifficultySelect extends Component {
    static propTypes = {
        difficulty:             PropTypes.string.isRequired,
        handleDifficultyChange: PropTypes.func.isRequired
    };

    constructor () {
        super();

        this.handleClickEasy = ::this._handleClickEasy;
        this.handleClickNormal = ::this._handleClickNormal;
        this.handleClickHard = ::this._handleClickHard;
    }

    _handleClickEasy (e) {
        e.preventDefault();
        this.props.handleDifficultyChange('easy');
    }

    _handleClickNormal (e) {
        e.preventDefault();
        this.props.handleDifficultyChange('normal');
    }

    _handleClickHard (e) {
        e.preventDefault();
        this.props.handleDifficultyChange('hard');
    }

    render () {
        const { difficulty } = this.props;
        const badgeEasy = difficulty === 'easy'
            ? <a
                className = { Styles.active }
                href = '#'
                onClick = { this.handleClickEasy }>
                <BadgeEasy />
            </a>
            : <a
                href = '#'
                onClick = { this.handleClickEasy }>
                <BadgeEasy />
            </a>;
        const badgeNormal = difficulty === 'normal'
            ? <a
                className = { Styles.active }
                href = '#'
                onClick = { this.handleClickNormal }>
                <BadgeNormal />
            </a>
            : <a
                href = '#'
                onClick = { this.handleClickNormal }>
                <BadgeNormal />
            </a>;
        const badgeHard = difficulty === 'hard'
            ? <a
                className = { Styles.active }
                href = '#'
                onClick = { this.handleClickHard }>
                <BadgeHard />
            </a>
            : <a
                href = '#'
                onClick = { this.handleClickHard }>
                <BadgeHard />
            </a>;

        return (
            <section className = { Styles.select }>
                { badgeEasy }
                { badgeNormal }
                { badgeHard }
            </section>
        );
    }
}
