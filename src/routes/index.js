import React from "react";
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import Verification from "../pages/Verification";

export default function index(){
    return(
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route path="/resetpassword" exact component={ResetPassword} />
            <ProtectedRoute path="/dashboard" exct component={Dashboard} />
            <ProtectedRoute path="/user-profile" exact component={Profile} />
            <ProtectedRoute path="/user-verification" exact component={Verification} />
        </Switch>
    )
}