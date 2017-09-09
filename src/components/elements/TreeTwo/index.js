// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import treeTwo from '../../../theme/assets/treetwo.svg';

const TreeTwo = ({ customClass }) => (
    <object
        className = { customClass }
        data = { treeTwo }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

TreeTwo.propTypes = {
    customClass: PropTypes.string
};

export default TreeTwo;
