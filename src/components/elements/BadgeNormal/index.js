// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import badgeNormal from '../../../theme/assets/Asset_7.svg';

const BadgeNormal = ({ customClass }) => (
    <object
        className = { customClass }
        data = { badgeNormal }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

BadgeNormal.propTypes = {
    customClass: PropTypes.string
};

export default BadgeNormal;
