// Core
import React from 'react';
import PropTypes from 'prop-types';

const HelpTip = ({ customClass, message }) => (
    <section
        className = { customClass }>
        { message }
    </section>
);

HelpTip.propTypes = {
    message:     PropTypes.string.isRequired,
    customClass: PropTypes.string
};

export default HelpTip;
