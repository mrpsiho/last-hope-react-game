// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import badgegenericdouble from '../../../theme/assets/badgegenericdouble.svg';

const BadgeGenericDoubleSided = ({ customClass }) => (
    <object
        className = { customClass }
        data = { badgegenericdouble }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

BadgeGenericDoubleSided.propTypes = {
    customClass: PropTypes.string
};

export default BadgeGenericDoubleSided;
