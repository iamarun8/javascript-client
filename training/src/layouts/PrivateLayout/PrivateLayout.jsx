import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components/index';

const PrivateLayout = ({ children, ...rest }) => (
    <div>
        <Navbar />
        <div>{children}</div>
    </div>
);

PrivateLayout.propTypes = {
    children: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default PrivateLayout;