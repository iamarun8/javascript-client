import React from 'react';
import { Mutation } from '@apollo/react-components';
import { LOGIN_USER } from './mutation';
import Login from './Login';

const login = () => (
  <Mutation mutation={LOGIN_USER}>
    {(loginUser) => (
      <>
        <Login loginUser={loginUser} />
      </>
    )}
  </Mutation>
);

export default login;