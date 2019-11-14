import React from 'react';
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => (
  <Switch>
    <PublicRoute path="/" component={LoginPage} exact={true} />
    <PrivateRoute path="/dashboard/:id?" component={DashboardPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default AppRouter;
