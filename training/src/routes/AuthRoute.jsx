import React from 'react';
import * as PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(matchProps) => (
            <AuthLayout>
                <Component {...matchProps} />
            </AuthLayout>
        )}
    />
);

AuthRoute.propTypes = {
    component: PropTypes.func.isRequired,
};

export default AuthRoute;