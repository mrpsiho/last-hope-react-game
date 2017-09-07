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
                hp:          10
            }
        },
        playing: true, // game status
        timer:   0, // seconds left
        status:  '' // result status ('success'|'fail')
    };

    componentWillMount () {
        const { fireDelay, round } = this.props;
        this.setState(({ chars, playing, status }) => {
            const { player, ai } = chars;

            return {
                chars: {
                    player: {
                        fireCounter: fireDelay,
                        hp:          player.hp,
                        position:    player.position
                    },
                    ai: {
                        fireCounter: fireDelay,
                        hp:          ai.hp
                    }
                },
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
        return setInterval(() => this._updateCounters(), 1000);
    }

    _updateCounters () {
        this.setState(({ chars, playing, timer, status }) => {
            const { player, ai } = chars;

            return {
                chars: {
                    player: {
                        fireCounter: player.fireDelay - 1,
                        hp:          player.hp,
                        position:    player.position
                    },
                    ai: {
                        fireCounter: ai.fireDelay - 1,
                        hp:          ai.hp
                    }
                },
                playing,
                timer: timer - 1,
                status
            };
        });
    }

    _fire () {
        const { fireCounter } = this.state.chars.player;

        if (fireCounter <= 0) {
            console.log('fire allowed!');
        }
    }

    _handleKeyDown (e) {
        e.preventDefault();
        const { position } = this.state.chars.player;

        if (e.keyCode === 32) {
            this._fire();
        }

        if (e.keyCode === 38) {
            const newY = position - 3;

            if (newY > 100) {
                this.setState(({ chars, playing, timer, status }) => {
                    const { player, ai } = chars;

                    return {
                        chars: {
                            player: {
                                fireCounter: player.fireCounter,
                                hp:          player.hp,
                                position:    newY
                            },
                            ai: {
                                fireCounter: ai.fireCounter,
                                hp:          ai.hp
                            }
                        },
                        playing,
                        timer,
                        status
                    };
                });
            } else {
                this.setState({
                    position: 100
                });
            }
        } else if (e.keyCode === 40) {
            const newY = position + 3;

            if (newY < 430) {
                this.setState(({ chars, playing, timer, status }) => {
                    const { player, ai } = chars;

                    return {
                        chars: {
                            player: {
                                fireCounter: player.fireCounter,
                                hp:          player.hp,
                                position:    newY
                            },
                            ai: {
                                fireCounter: ai.fireCounter,
                                hp:          ai.hp
                            }
                        },
                        playing,
                        timer,
                        status
                    };
                });
            } else {
                this.setState({
                    position: 430
                });
            }
        }
    }

    _clickOnHomeBtn () {
        this.props.goTo('home');
    }

    render () {
        const { timer } = this.state;
        const playerY = this.state.chars.player.position;
        const playerTop = {
            top: `${playerY}px`
        };

        return (
            <section
                className = { Styles.gamefield }>
                <TreeOne customClass = { Styles.treeone } />
                <TreeTwo customClass = { Styles.treetwo } />
                <Timer
                    customClass = { Styles.timer }
                    time = { timer }
                />
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
                    type = 'ai'
                />
            </section>
        );
    }
}
