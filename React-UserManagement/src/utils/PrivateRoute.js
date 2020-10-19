import React from 'react';
import { Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
        
    <Route {...rest} render={props => (
        localStorage.getItem('userId')
            ? <Component {...props} />
            : (window.location="http://localhost:8082/knowledge/glogin")
    )} />
)