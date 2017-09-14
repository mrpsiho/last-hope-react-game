// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.scss';
import { getRandomNumber } from '../../helpers/index';

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
            position:    getRandomNumber(200, 330)
        },
        playerBullet: {
            fired: false,
            x:     190,
            y:     0
        },
        ai: {
            fireCounter: 0,
            hp:          10,
            position:    getRandomNumber(200, 330),
            direction:   'up'
        },
        aiBullet: {
            fired: false,
            x:     760,
            y:     0
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

        return 190;
    };

    _getPlayerBulletNewStatus = ({ x, fired }) => fired && x + 35 <= 1000;

    _getAiBulletNewX = ({ x, fired }) => {
        if (fired && x - 35 >= -10) {
            return x - 35;
        } else if (fired) {
            return -10;
        }

        return 760;
    };

    _getAiBulletNewStatus = ({ x, fired }) => fired && x - 35 >= -10;

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
            const newAiPosition = this._getNewAiPosition(ai, 12);
            const newAiDirection = this._getNewAiDirection(ai.direction, newAiPosition);
            const playerWon = this._evaluateCollision(playerBullet, ai.position, 'ai');
            const aiWon = this._evaluateCollision(aiBullet, player.position, 'player');

            this._aiMayFire();

            if (playerWon) {
                this.props.endGame(true, timer);
            } else if (timer === 0 || aiWon) {
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
                    aiBullet: {
                        fired: this._getAiBulletNewStatus(aiBullet),
                        x:     this._getAiBulletNewX(aiBullet),
                        y:     aiBullet.y
                    },
                    timer: newTimer
                };

            }
        });
    }

    _evaluateCollision (bullet, position, target) {
        if (target === 'ai') {
            const aiInRangeX = bullet.x > 775 && bullet.x < 819;
            const aiInRangeY = bullet.y > position - 12 && bullet.y < position + 58;

            return aiInRangeX && aiInRangeY;
        }

        if (target === 'player') {
            const playerInRangeX = bullet.x > 140 && bullet.x < 185;
            const playerInRangeY = bullet.y > position - 10 && bullet.y < position + 57;

            return playerInRangeX && playerInRangeY;
        }

        return false;
    }

    _aiMayFire () {
        const { ai, aiBullet } = this.state;
        const chanceOfFire = Math.random() >= 0.5;

        if (ai.fireCounter === 0 && !aiBullet.fired && chanceOfFire) {
            this.setState(({ player, playerBullet, timer }) =>
                ({
                    player,
                    playerBullet,
                    ai: {
                        fireCounter: this.props.fireDelay,
                        hp:          ai.hp,
                        position:    ai.position,
                        direction:   ai.direction
                    },
                    aiBullet: {
                        fired: true,
                        x:     760,
                        y:     ai.position + 20
                    },
                    timer
                })
            );
        }

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
        const { playerBullet, aiBullet, timer } = this.state;
        const playerY = this.state.player.position;
        const playerTop = {
            top: `${playerY}px`
        };
        const playerBulletTop = {
            top:  `${playerBullet.y}px`,
            left: `${playerBullet.x}px`
        };
        const playerBulletComp = playerBullet.fired
            ? <Bullet
                customClass = { Styles.playerBullet }
                customStyle = { playerBulletTop }
            />
            : null;
        const aiY = this.state.ai.position;
        const aiTop = {
            top: `${aiY}px`
        };
        const aiBulletTop = {
            top:  `${aiBullet.y}px`,
            left: `${aiBullet.x}px`
        };
        const aiBulletComp = aiBullet.fired
            ? <Bullet
                customClass = { Styles.aiBullet }
                customStyle = { aiBulletTop }
            />
            : null;

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
                { playerBulletComp }
                { aiBulletComp }
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
