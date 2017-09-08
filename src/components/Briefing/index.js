// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.scss';

// Components
import BadgeGenericTrapezium from '../../elements/BadgeGenericTrapezium';
import Rogers from '../../elements/Rogers';
import Wheel from '../../elements/Wheel';

export default class Debriefing extends Component {
    static propTypes = {
        goTo: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired
    };

    constructor () {
        super();

        this.clickOnHomeBtn = ::this._clickOnHomeBtn;
    }

    _clickOnHomeBtn () {
        this.props.goTo('gamefield');
    }

    render () {
        return (<section className = { Styles.briefing }>
            <Wheel customClass = { Styles.wheel } />
            <div>
                <p>You have done it well, soldier! There is only
                one enemy left and you have got a chance to get
                him back to hell. This will be you final battle.
                You are our last hope!</p>
            </div>
            <BadgeGenericTrapezium customClass = { Styles.badge } />
            <h2>
                Briefing
            </h2>
            <button onClick = { this.clickOnHomeBtn }>
                Ready
            </button>
            <Rogers customClass = { Styles.rogers } />
            <span>Captain Rogers</span>
        </section>);
    }
}
