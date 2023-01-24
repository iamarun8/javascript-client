import React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(matchProps) => {
            if (!(localStorage.getItem('token'))) {
                return (
                    <AuthLayout>
                        <Component {...matchProps} />
                    </AuthLayout>
                );
            }
            return (
                <Route>
                    <Redirect to="/trainee" />
                </Route>
            );
        }}
    />
);

AuthRoute.propTypes = {
    Component: PropTypes.objectOf(PropTypes.any),
};

export default AuthRoute;