import React from "react";
import { Route, Switch } from 'react-router-dom';
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export default function index(){
    return(
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/dashboard" exct component={Dashboard} />
        </Switch>
    )
}