// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import bullet from '../../theme/assets/bullet.svg';

const Bullet = ({ customClass, customStyle }) => (
    <section
        className = { customClass }
        style = { customStyle }>
        <object
            data = { bullet }
            type = 'image/svg+xml'>
            Your browser does not support SVGs
        </object>
    </section>
);

Bullet.propTypes = {
    customClass: PropTypes.string,
    customStyle: PropTypes.object
};

export default Bullet;
