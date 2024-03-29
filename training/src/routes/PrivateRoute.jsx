import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { PrivateLayout } from '../layouts';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(matchProps) => {
            if ((localStorage.getItem('token'))) {
                return (
                    <PrivateLayout>
                        <Component {...matchProps} />
                    </PrivateLayout>
                );
            }
            return (
                <Route>
                    <Redirect to="/login" />
                </Route>
            );
        }}
    />
);

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired
};

export default PrivateRoute;
