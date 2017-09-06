// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import bullet from '../../theme/assets/bullet.svg';

const Bullet = ({ customClass }) => (
    <object
        className = { customClass }
        data = { bullet }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

Bullet.propTypes = {
    customClass: PropTypes.string
};

export default Bullet;
