// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.scss';

// Components
import Stars from '../../elements/Stars';
import Wheel from '../../elements/Wheel';

export default class Debriefing extends Component {
    static propTypes = {
        goTo:   PropTypes.func.isRequired,
        status: PropTypes.string.isRequired
    };

    constructor () {
        super();

        this.clickOnHomeBtn = ::this._clickOnHomeBtn;
    }

    _clickOnHomeBtn () {
        this.props.goTo('home');
    }

    render () {
        const { status } = this.props;

        return status === 'succeeded'
            ? <section className = { Styles.debriefing }>
                <div className = { Styles.scoresBg }>
                    <div className = { Styles.scoresBg1 } />
                    <div className = { Styles.scoresBg2 } />
                    <div className = { Styles.scoresBg3 } />
                    <div className = { Styles.scoresBgFg } />
                </div>
                <Wheel customClass = { Styles.wheel } />
                <Stars customClass = { Styles.starsOne } />
                <h2 className = { Styles.congratsText }>
                    Congratulations!
                </h2>
                <button
                    className = { Styles.homeBtnOne }
                    onClick = { this.clickOnHomeBtn }>
                    Home
                </button>
            </section>
            : <section className = { Styles.debriefing }>
                <div className = { Styles.scoresBg }>
                    <div className = { Styles.scoresBg1 } />
                    <div className = { Styles.scoresBg2 } />
                    <div className = { Styles.scoresBg3 } />
                    <div className = { Styles.scoresBgFg } />
                </div>
                <h2 className = { Styles.failText } >
                    Game Over
                </h2>
                <button
                    className = { Styles.homeBtnTwo }
                    onClick = { this.clickOnHomeBtn }>
                    Home
                </button>
            </section>;
    }
}
