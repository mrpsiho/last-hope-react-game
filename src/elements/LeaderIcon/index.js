// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import leader from '../../theme/assets/leader.svg';

const LeaderIcon = ({ customClass }) => (
    <object
        className = { customClass }
        data = { leader }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

LeaderIcon.propTypes = {
    customClass: PropTypes.string
};

export default LeaderIcon;
