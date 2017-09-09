// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import wheel from '../../../theme/assets/wheel.svg';

const Wheel = ({ customClass }) => (
    <object
        className = { customClass }
        data = { wheel }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

Wheel.propTypes = {
    customClass: PropTypes.string
};

export default Wheel;
