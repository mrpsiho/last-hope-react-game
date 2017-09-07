// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import timer from '../../theme/assets/timer.svg';

const Timer = ({ customClass, time }) => (
    <section className = { customClass }>
        <object
            data = { timer }
            type = 'image/svg+xml'>
            Your browser does not support SVGs
        </object>
        <span>{ time }</span>
    </section>
);

Timer.propTypes = {
    customClass: PropTypes.string,
    time:        PropTypes.number
};

export default Timer;
