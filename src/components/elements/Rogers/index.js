// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import rogers from '../../../theme/assets/rogers.svg';

const Rogers = ({ customClass }) => (
    <object
        className = { customClass }
        data = { rogers }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

Rogers.propTypes = {
    customClass: PropTypes.string
};

export default Rogers;
