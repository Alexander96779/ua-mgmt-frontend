import React from "react";
import { Route, Switch } from 'react-router-dom';
import Signup from "../pages/Signup";

export default function index(){
    return(
        <Switch>
            <Route path="/" exact component={Signup} />

        </Switch>
    )
}