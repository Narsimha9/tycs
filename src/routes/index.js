import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../components/baseComponents/Layout';
import DashboardLayout from '../components/baseComponents/dashboardLayout'
import Login from "../appModules/login/index";
import Signup from "../appModules/signup/index";
import NotFoundPage from '../components/sharedComponents/notFoundPage';
import { getAccessToken } from "../utils/index";

const ProtectedRoute = ({
    component: Component,
    ...rest
}) => (<Route {...rest} render={props => (

    getAccessToken() ? (<Component  {...props} />)
        : window.location.href = '/')} />);

export default () => (
    <Router>
        <Switch>
            <ProtectedRoute path="/app" component={DashboardLayout} />
            <Route exact path="/signin" component={Login} />
            <Route exact path="/" component={Layout} />
            <Route exact path="/signup" component={Signup} />
            <Route path={`/*`} component={NotFoundPage} />
        </Switch>
    </Router>
)