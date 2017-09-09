// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import wheeloverlay from '../../../theme/assets/wheeloverlay.svg';

const WheelOverlay = ({ customClass }) => (
    <object
        className = { customClass }
        data = { wheeloverlay }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

WheelOverlay.propTypes = {
    customClass: PropTypes.string
};

export default WheelOverlay;
