// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import badgeEasy from '../../theme/assets/badgeEasy.svg';

const BadgeEasy = ({ customClass }) => (
    <object
        className = { customClass }
        data = { badgeEasy }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

BadgeEasy.propTypes = {
    customClass: PropTypes.string
};

export default BadgeEasy;
