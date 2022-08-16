import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import AuthService from '../utils/AuthService';

function ProtectedRoute({ component: Component, ...rest }){
    return(
        <Route 
        {...rest}
        render={(props) =>{
            try {
            const token = AuthService.getToken();
            const email = localStorage.getItem('username');
            const { exp } = jwtDecode(AuthService.getToken());
            const expirationTime = (exp * 1000) - 60000;
            if(token && email && expirationTime > Date.now()){

                return <Component />;
            } else {
                localStorage.clear();
                return (
                    <Redirect to={{ pathname: "/" }} />
                );
            }
        } catch (error) {
            localStorage.clear();
            return (
                <Redirect to={{ pathname: "/" }} />
            );  
        }
        }}
        />
    );
}

export default ProtectedRoute;