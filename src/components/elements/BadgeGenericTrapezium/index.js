// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import badgegenerictrapezium from '../../../theme/assets/badgegenerictrapezium.svg';

const BadgeGenericTrapezium = ({ customClass }) => (
    <object
        className = { customClass }
        data = { badgegenerictrapezium }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

BadgeGenericTrapezium.propTypes = {
    customClass: PropTypes.string
};

export default BadgeGenericTrapezium;
