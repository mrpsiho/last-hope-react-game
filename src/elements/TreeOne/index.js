// Core
import React from 'react';
import PropTypes from 'prop-types';

// Assets
import treeOne from '../../theme/assets/treeone.svg';

const TreeOne = ({ customClass }) => (
    <object
        className = { customClass }
        data = { treeOne }
        type = 'image/svg+xml'>
        Your browser does not support SVGs
    </object>
);

TreeOne.propTypes = {
    customClass: PropTypes.string
};

export default TreeOne;
