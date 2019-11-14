import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AuthenticationContext from '../context/authentication';

export const failedAuthComponent = () => (<Redirect to="/" />);

export const wrapComponentWithAuthenticatedLayout = (Component) => (props) => (
  <React.Fragment>
    <Header />
    <Component {...props} />
  </React.Fragment>
);

export const PrivateRoute = ({ component, ...rest }) => {
  const { uid } = useContext(AuthenticationContext);
  const isAuthenticated = !!uid;

  const resolvedComponent = isAuthenticated ? wrapComponentWithAuthenticatedLayout(component) : failedAuthComponent;

  return (<Route {...rest} component={ resolvedComponent } />);
}

export default PrivateRoute;
