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
        this._playerChar = ::this._playerChar;
    }

    state = {
        chars: {
            player: {
                fireCounter: 0, // reloading counter
                hp:          10, // heal points
                position:    0 // getElementById(); element.style.top
            },
            ai: {
                fireCounter: 0,
                hp:          10,
                position:    0
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

    componentDidMount () {
        this._playerChar();
    }

    _positionUpdateTimer () {
        return setInterval(() => this._updateCharsPostion(), 500);
    }

    _updateCharsPostion () {
        // const player = getElementById('player');
        // const ai = getElementById('player');

        //console.log(this.playerChar);
    }

    _playerChar () {
        console.log(this.playerChar);
    }

    _clickOnHomeBtn () {
        this.props.goTo('home');
    }

    render () {
        const style = {
            top: '50px'
        };

        return (
            <section className = { Styles.gamefield }>
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
                    customStyle = { style }
                    charRef = { (el) => this.playerChar = el }
                    type = 'player'
                />
                <Char
                    addGas
                    customClass = { Styles.anto }
                    type = 'ai'
                />
            </section>
        );
    }
}
