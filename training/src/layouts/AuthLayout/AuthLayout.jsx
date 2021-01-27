import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';

const AuthLayout = ({ children, ...rest }) => (
    <div>
        <div>{children}</div>
        <Footer />
    </div>
);

AuthLayout.propTypes = {
    children: PropTypes.object.isRequired,
};

export default AuthLayout;