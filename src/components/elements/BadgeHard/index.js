// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import badgeHard from '../../../theme/assets/Asset_8.svg';

const BadgeHard = ({ customClass }) => (
    <object
        className = { customClass }
        data = { badgeHard }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

BadgeHard.propTypes = {
    customClass: PropTypes.string
};

export default BadgeHard;
