// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.scss';

// Components
import Char from '../../components/Char';
import TreeOne from '../../elements/TreeOne';
import TreeTwo from '../../elements/TreeTwo';
import Timer from '../../elements/Timer';

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
        this.handleKeyDown = ::this._handleKeyDown;
    }

    state = {
        chars: {
            player: {
                fireCounter: 0, // reloading counter
                hp:          10, // heal points
                position:    430 // getElementById(); element.style.top
            },
            ai: {
                fireCounter: 0,
                hp:          10,
                position:    430
            }
        },
        playing: true, // game status
        timer:   0, // seconds left
        status:  '' // result status ('success'|'fail')
    };

    componentWillMount () {
        this._updateCharsPostion();
        //this._positionUpdateTimer();
    }

    componentWillUnmount () {
        //clearInterval(this._positionUpdateTimer());
    }

    _positionUpdateTimer () {
        return setInterval(() => this._updateCharsPostion(), 500);
    }

    _updateCharsPostion () {
        // const player = getElementById('player');
        // const ai = getElementById('player');

        //console.log(this.playerChar);
    }

    _handleKeyDown (e) {
        e.preventDefault();
        console.log(e);
    }

    _clickOnHomeBtn () {
        this.props.goTo('home');
    }

    render () {
        const playerY = this.state.chars.player.position;
        const aiY = this.state.chars.ai.position;
        const playerTop = {
            top: `${playerY}px`
        };
        const aiTop = {
            top: `${aiY}px`
        };

        return (
            <section
                className = { Styles.gamefield }
                onKeyPress = { this.handleKeyDown }>
                <TreeOne customClass = { Styles.treeone } />
                <TreeTwo customClass = { Styles.treetwo } />
                <Timer customClass = { Styles.timer } />
                <button
                    className = { Styles.homeBtn }
                    onClick = { this.clickOnHomeBtn }>
                    Home
                </button>
                <Char
                    addGas
                    customClass = { Styles.prota }
                    customStyle = { playerTop }
                    type = 'player'
                />
                <Char
                    addGas
                    customClass = { Styles.anto }
                    customStyle = { aiTop }
                    type = 'ai'
                />
            </section>
        );
    }
}
