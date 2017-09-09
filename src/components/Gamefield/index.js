// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.scss';

// Components
import Char from '../../components/Char';
import TreeOne from '../../components/elements/TreeOne';
import TreeTwo from '../../components/elements/TreeTwo';
import Timer from '../../components/elements/Timer';
import Bullet from '../../components/elements/Bullet';

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
            fired: false,
            x:     190,
            y:     0
        },
        ai: {
            fireCounter: 0,
            hp:          10,
            position:    430,
            direction:   'up'
        },
        aiBullet: {
            fired: false,
            x:     760
        },
        timer: 0
    };

    componentWillMount () {
        const { round } = this.props;

        this.setState(({ player, playerBullet, ai, aiBullet }) =>
            ({
                player: {
                    fireCounter: 0,
                    hp:          player.hp,
                    position:    player.position
                },
                playerBullet,
                ai: {
                    fireCounter: 0,
                    hp:          ai.hp,
                    position:    ai.position,
                    direction:   'up'
                },
                aiBullet,
                timer: round
            })
        );
        this._updateGame();
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount () {
        clearInterval(this.interval);
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    _updateGame () {
        this.interval = setInterval(() => this._updateEverything(), 200);
    }

    _getPlayerBulletNewX = ({ x, fired }) => {
        if (fired && x + 35 <= 1000) {
            return x + 35;
        } else if (fired) {
            return 1000;
        }
    };

    _getPlayerBulletNewStatus = ({ x, fired }) => {
        if (fired && x + 35 <= 1000) {
            return true;
        } else if (fired) {
            return false;
        }
    };

    _getNewAiPosition = (ai, modifier) => {
        const { position, direction } = ai;

        if (direction === 'up') {
            return position - modifier > 100 ? position - modifier : 100;
        } else if (direction === 'down') {
            return position + modifier < 430 ? position + modifier : 430;
        }
    };

    _getNewAiDirection = (curDirection, position) => {
        if (position === 100) {
            return 'down';
        } else if (position === 430) {
            return 'up';
        }

        return curDirection;
    };

    _updateEverything () {
        this.setState(({ player, playerBullet, ai, aiBullet, timer }) => {
            const newTimer = timer - 0.2 > 0 ? timer - 0.2 : 0;
            let playerWon = false;
            const newAiPosition = this._getNewAiPosition(ai, 12);
            const newAiDirection = this._getNewAiDirection(ai.direction, newAiPosition);

            if (playerBullet.fired) {
                playerWon = this._evaluateCollision(playerBullet.x, playerBullet.y, newAiPosition);
            }

            if (playerWon) {
                this.props.endGame(true, timer);
            } else if (timer === 0) {
                this.props.endGame(false);
            } else {

                return {
                    player: {
                        fireCounter: player.fireCounter - 0.2 >= 0 ? player.fireCounter - 0.2 : 0,
                        hp:          player.hp,
                        position:    player.position
                    },
                    playerBullet: {
                        fired: this._getPlayerBulletNewStatus(playerBullet),
                        x:     this._getPlayerBulletNewX(playerBullet),
                        y:     playerBullet.y
                    },
                    ai: {
                        fireCounter: ai.fireCounter - 0.2 >= 0 ? ai.fireCounter - 0.2 : 0,
                        hp:          ai.hp,
                        position:    newAiPosition,
                        direction:   newAiDirection
                    },
                    aiBullet,
                    timer: newTimer
                };

            }
        });
    }

    _evaluateCollision (pBulletX, pBulletY, aiPos) {
        const val = aiPos + 20 - pBulletY;

        // 25 is rather abitrary number that corrects target zone
        if (pBulletX > 760 && pBulletX < 790 && Math.abs(val) < 25) {
            return true;
        }

        return false;
    }

    _fire () {
        const { player, playerBullet } = this.state;

        if (player.fireCounter === 0 && !playerBullet.fired) {
            this.setState(({ ai, aiBullet, timer }) =>
                ({
                    player: {
                        fireCounter: this.props.fireDelay,
                        hp:          player.hp,
                        position:    player.position
                    },
                    playerBullet: {
                        fired: true,
                        x:     190,
                        y:     player.position + 32
                    },
                    ai,
                    aiBullet,
                    timer
                })
            );
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

            this.setState(({ player, playerBullet, ai, aiBullet, timer }) =>
                ({
                    player: {
                        fireCounter: player.fireCounter,
                        hp:          player.hp,
                        position:    newY
                    },
                    playerBullet,
                    ai,
                    aiBullet,
                    timer
                })
            );
        }
    }

    _clickOnHomeBtn () {
        this.props.goTo('home');
    }

    render () {
        const { playerBullet, timer } = this.state;
        const playerY = this.state.player.position;
        const playerTop = {
            top: `${playerY}px`
        };
        const bulletTop = {
            top:  `${playerBullet.y}px`,
            left: `${playerBullet.x}px`
        };
        const bulletPlayer = playerBullet.fired
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
