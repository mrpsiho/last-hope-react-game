// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import timer from '../../theme/assets/timer.svg';

const Timer = ({ customClass }) => (
    <object
        className = { customClass }
        data = { timer }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

Timer.propTypes = {
    customClass: PropTypes.string
};

export default Timer;
