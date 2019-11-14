import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationContext from '../context/authentication';

export const wrapComponentWithUnauthenticatedLayout = (Component) => (props) => (<Component {...props} />);
export const failedUnauthComponent = (props) => (<Redirect to="/dashboard" />);

export const PublicRoute = ({ component, ...rest }) => {
  const { uid } = useContext(AuthenticationContext);
  const isAuthenticated = !!uid;
  const resolvedComponent = isAuthenticated ? failedUnauthComponent : wrapComponentWithUnauthenticatedLayout(component);

  return (<Route {...rest} component={ resolvedComponent } />);
};
export default PublicRoute;
