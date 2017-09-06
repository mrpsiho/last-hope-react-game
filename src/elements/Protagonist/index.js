// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import prota from '../../theme/assets/prota.svg';
import protaGas from '../../theme/assets/prota_gas.svg';

const Protagonist = ({ addGas = false, customClass = '' }) => addGas
    ? (
        <section className = { customClass }>
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
        <section className = { customClass }>
            <object
                data = { prota }
                type = 'image/svg+xml'>
                Your browser does not support SVGs
            </object>
        </section>
    );

Protagonist.propTypes = {
    addGas:      PropTypes.bool,
    customClass: PropTypes.string
};

export default Protagonist;
