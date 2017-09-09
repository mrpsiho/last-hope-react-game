// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

// Instruments
import Styles from './styles.scss';

// Components
import BadgeGenericTrapezium from '../../components/elements/BadgeGenericTrapezium';
import Rogers from '../../components/elements/Rogers';
import Wheel from '../../components/elements/Wheel';
import HelpTip from '../../components/elements/HelpTip';

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
            <div className = { Styles.textWrapper }>
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
            <span className = { Styles.captain }>Captain Rogers</span>
            <CSSTransition
                appear
                classNames = 'help'
                timeout = { 1200 }>
                <HelpTip
                    customClass = { Styles.tip }
                    message = 'Use arrows keys to move Up and Down.
                    Press "space" to fire.'
                />
            </CSSTransition>
        </section>);
    }
}
