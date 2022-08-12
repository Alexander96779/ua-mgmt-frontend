import React from "react";
import { Route, Switch } from 'react-router-dom';
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

export default function index(){
    return(
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/dashboard" exct component={Dashboard} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route path="/resetpassword" exact component={ResetPassword} />
        </Switch>
    )
}