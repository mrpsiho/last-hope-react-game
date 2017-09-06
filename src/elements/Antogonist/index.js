// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import anto from '../../theme/assets/anto.svg';
import antoGas from '../../theme/assets/anto_gas.svg';

const Antogonist = ({ addGas = false, customClass = '' }) => addGas
    ? (
        <section className = { customClass }>
            <object
                data = { anto }
                type = 'image/svg+xml'>
                Your browser does not support SVGs
            </object>
            <object
                data = { antoGas }
                type = 'image/svg+xml'>
                Your browser does not support SVGs
            </object>
        </section>
    )
    : (
        <section className = { customClass }>
            <object
                data = { anto }
                type = 'image/svg+xml'>
                Your browser does not support SVGs
            </object>
        </section>
    );

Antogonist.propTypes = {
    addGas:      PropTypes.bool,
    customClass: PropTypes.string
};

export default Antogonist;
