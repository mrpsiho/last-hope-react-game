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
import Bullet from '../../elements/Bullet';

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
        player: {
            fireCounter: 0,
            hp:          10,
            position:    430
        },
        playerBullet: {
            x: 190
        },
        ai: {
            fireCounter: 0,
            hp:          10,
            position:    430,
            direction:   'up'
        },
        aiBullet: {
            x: 760
        },
        playing: true, // game status
        timer:   0, // seconds left
        status:  '' // result status ('success'|'fail')
    };

    componentWillMount () {
        const { fireDelay, round } = this.props;

        this.setState(({ player, playerBullet, ai, aiBullet, playing, status }) => {
            return {
                player: {
                    fireCounter: fireDelay,
                    hp:          player.hp,
                    position:    player.position
                },
                playerBullet,
                ai: {
                    fireCounter: fireDelay,
                    hp:          ai.hp,
                    position:    ai.position,
                    direction:   'up'
                },
                aiBullet,
                playing,
                timer: round,
                status
            };
        });
        //this._updateCharsPostion();
        this._updateTimer();
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount () {
        clearInterval(this._updateTimer());
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    _updateTimer () {
        return setInterval(() => this._updateCounters(), 200);
    }

    _updateCounters () {
        this.setState(({ player, playerBullet, ai, aiBullet, playing, timer, status }) => {
            const newTimer = timer >= 0 ? timer - 0.2 : 0;
            let newAiPosition = ai.position;
            let newAiDirection = ai.direction;

            if (ai.direction === 'up') {
                newAiPosition = newAiPosition - 3 > 100
                    ? newAiPosition - 12 : 100;
            } else if (ai.direction === 'down') {
                newAiPosition = newAiPosition + 3 < 430
                    ? newAiPosition + 12 : 430;
            }
            if (newAiPosition === 100) {
                newAiDirection = 'down';
            } else if (newAiPosition === 430) {
                newAiDirection = 'up';
            }

            return {
                player: {
                    fireCounter: player.fireCounter - 0.2,
                    hp:          player.hp,
                    position:    player.position
                },
                playerBullet,
                ai: {
                    fireCounter: ai.fireCounter - 0.2,
                    hp:          ai.hp,
                    position:    newAiPosition,
                    direction:   newAiDirection
                },
                aiBullet,
                playing,
                timer: newTimer,
                status
            };
        });
    }

    _fire () {
        const { fireCounter } = this.state.player;

        if (fireCounter <= 0) {
            console.log('fire allowed!');
            // TODO fire bullet

            this.setState(({ player, playerBullet, ai, aiBullet, playing, timer, status }) => {
                return {
                    player: {
                        fireCounter: this.props.fireDelay,
                        hp:          player.hp,
                        position:    player.position
                    },
                    playerBullet,
                    ai,
                    aiBullet,
                    playing,
                    timer,
                    status
                };
            });
        }
    }

    _handleKeyDown (e) {
        e.preventDefault();
        const { position } = this.state.player;

        if (e.keyCode === 32) {
            this._fire();
        }

        if (e.keyCode === 38 || e.keyCode === 40) {
            let newY = 0;

            if (e.keyCode === 38) {
                newY = position - 3;

                if (newY < 100) {
                    newY = 100;
                }
            } else if (e.keyCode === 40) {
                newY = position + 3;

                if (newY > 430) {
                    newY = 430;
                }
            }

            this.setState(({ player, playerBullet, ai, aiBullet, playing, timer, status }) => {
                return {
                    player: {
                        fireCounter: player.fireCounter,
                        hp:          player.hp,
                        position:    newY
                    },
                    playerBullet,
                    ai,
                    aiBullet,
                    playing,
                    timer,
                    status
                };
            });
        }
    }

    _clickOnHomeBtn () {
        this.props.goTo('home');
    }

    render () {
        const { timer } = this.state;
        const playerY = this.state.player.position;
        const playerTop = {
            top: `${playerY}px`
        };
        const bulletTop = {
            top: `${playerY + 32}px`
        };
        const bulletPlayer = timer < 30
            ? <Bullet
                customClass = { Styles.bulletPlayer }
                customStyle = { bulletTop }
            />
            : null;
        const aiY = this.state.ai.position;
        const aiTop = {
            top: `${aiY}px`
        };

        return (
            <section
                className = { Styles.gamefield }>
                <TreeOne customClass = { Styles.treeone } />
                <TreeTwo customClass = { Styles.treetwo } />
                <Timer
                    customClass = { Styles.timer }
                    time = { Math.ceil(timer) }
                />
                <button
                    className = { Styles.homeBtn }
                    onClick = { this.clickOnHomeBtn }>
                    Home
                </button>
                { bulletPlayer }
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
