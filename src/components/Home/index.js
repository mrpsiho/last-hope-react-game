// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.scss';

// Components
import Wheel from '../../components/elements/Wheel';
import WheelOverlay from '../../components/elements/WheelOverlay';
import LeaderIcon from '../../components/elements/LeaderIcon';
import Protagonist from '../../components/elements/Protagonist';
import DifficultySelect from '../../components/DifficultySelect';

export default class Home extends Component {
    static propTypes = {
        changeGameProps: PropTypes.func.isRequired,
        difficulty:      PropTypes.string.isRequired,
        goTo:            PropTypes.func.isRequired,
        name:            PropTypes.string
    };

    constructor () {
        super();

        this.handleNameChange = ::this._handleNameChange;
        this.handleDifficultyChange = ::this._handleDifficultyChange;
        this.clickOnLeaderBtn = ::this._clickOnLeaderBtn;
        this.clickOnPlayBtn = ::this._clickOnPlayBtn;
    }

    _handleNameChange (e) {
        if (e.target.value.length <= 15) {
            const data = {
                difficulty: this.props.difficulty,
                name:       e.target.value
            };

            this.props.changeGameProps(data);
        }
    }

    _handleDifficultyChange (difficulty) {
        const data = {
            difficulty,
            name: this.props.name
        };

        this.props.changeGameProps(data);
    }

    _clickOnLeaderBtn () {
        this.props.goTo('leaderboard');
    }

    _clickOnPlayBtn () {
        if (this.props.name) {
            this.props.goTo('briefing');
        }
    }

    render () {
        const { name, difficulty } = this.props;

        return (
            <section className = { Styles.home }>
                <Wheel customClass = { Styles.wheel } />
                <WheelOverlay customClass = { Styles.wheeloverlay } />
                <Protagonist customClass = { Styles.prota } />
                <h1><span>Last</span><span>Hope</span></h1>
                <label>Enter Your Name</label>
                <input
                    name = 'username'
                    type = 'text'
                    value = { name }
                    onChange = { this.handleNameChange }
                />
                <label>Choose Difficulty</label>
                <DifficultySelect
                    difficulty = { difficulty }
                    handleDifficultyChange = {
                        this.handleDifficultyChange
                    }
                />
                <button
                    className = { Styles.leaderBtn }
                    onClick = { this.clickOnLeaderBtn }>
                    <LeaderIcon
                        customClass = { Styles.leaderIcon }
                    />
                </button>
                <button
                    className = { Styles.playBtn }
                    onClick = { this.clickOnPlayBtn }>
                    Play Game
                </button>
            </section>
        );
    }
}
