// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import prota from '../../theme/assets/prota.svg';
import protaGas from '../../theme/assets/prota_gas.svg';

const Protagonist = ({ addGas = false, charRef, customClass = '', customStyle = {} }) => addGas
    ? (
        <section
            className = { customClass }
            style = { customStyle }
            ref = { (el) => charRef = el }>
            <object
                data = { prota }
                type = 'image/svg+xml'>
                Your browser does not support SVGs
            </object>
            <object
                data = { protaGas }
                type = 'image/svg+xml'>
                Your browser does not support SVGs
            </object>
        </section>
    )
    : (
        <section className = { customClass } style = { customStyle }>
            <object
                data = { prota }
                type = 'image/svg+xml'>
                Your browser does not support SVGs
            </object>
        </section>
    );

Protagonist.propTypes = {
    addGas:      PropTypes.bool,
    charRef:     PropTypes.func,
    customClass: PropTypes.string,
    customStyle: PropTypes.object
};

export default Protagonist;
