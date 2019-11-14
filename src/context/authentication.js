import React from 'react';

const AuthenticationContext = React.createContext({
  uid: undefined,
  login: () => {},
  logout: () => {}
});

export default AuthenticationContext;
