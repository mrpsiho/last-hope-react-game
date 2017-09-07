// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
//import Styles from './styles.scss';

// Components
import Protagonist from '../../elements/Protagonist';
import Antogonist from '../../elements/Antogonist';

export default class Char extends Component {
    static propTypes = {
        type:        PropTypes.string.isRequired,
        addGas:      PropTypes.bool,
        customClass: PropTypes.string,
        customStyle: PropTypes.object
    };

    static defaultProps = {
        addGas: false
    };

    render () {
        const { addGas, customClass, customStyle, type } = this.props;

        return type === 'player'
            ? <Protagonist
                addGas = { addGas }
                customClass = { customClass }
                customStyle = { customStyle }
            />
            : <Antogonist
                addGas = { addGas }
                customClass = { customClass }
                customStyle = { customStyle }
            />;
    }
}
