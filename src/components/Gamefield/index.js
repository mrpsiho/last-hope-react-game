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
        const { fireDelay, round } = this.props;

        this.setState(({ player, playerBullet, ai, aiBullet }) =>
            ({
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
                timer: round
            })
        );
        this._updateGame();
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount () {
        clearInterval(this._updateGame());
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    _updateGame () {
        return setInterval(() => this._updateEverything(), 200);
    }

    _updateEverything () {
        this.setState(({ player, playerBullet, ai, aiBullet, timer }) => {
            let playerBulletNewX = playerBullet.x;
            let playerBulletNewStatus = playerBullet.fired;
            let newAiPosition = ai.position;
            let newAiDirection = ai.direction;
            const newTimer = timer - 0.2 > 0 ? timer - 0.2 : 0;
            let playerWon = false;

            if (playerBullet.fired && playerBullet.x + 35 <= 1000) {
                playerBulletNewX = playerBullet.x + 35;
            } else if (playerBullet.fired) {
                playerBulletNewX = 1000;
                playerBulletNewStatus = false;
            }
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
                        fired: playerBulletNewStatus,
                        x:     playerBulletNewX,
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
            //console.log( 'bullet in target!', pBulletX, pBulletY );
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
