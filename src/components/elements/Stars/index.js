// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import stars from '../../../theme/assets/stars.svg';

const Stars = ({ customClass }) => (
    <object
        className = { customClass }
        data = { stars }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

Stars.propTypes = {
    customClass: PropTypes.string
};

export default Stars;
