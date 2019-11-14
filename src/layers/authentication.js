import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase';
import AuthenticationContext from '../context/authentication';
import configureStore from '../store/configureStore';
import { startSetUserDetails } from '../actions/userDetails';
import { startSetDays, subscribeToDays } from '../actions/day';
import { login, logout } from '../actions/auth';

const AuthenticationLayer = (props) => {
  const [initialized, setInitialized] = useState(false);
  const [uid, setUid] = useState(firebase.auth().currentUser);

  const getThisTheFuckOutOfThisFile = (id) => {
    props.login(id);
    props.startSetUserDetails().then(() => {
      props.startSetDays().then(() => {
        // subscribeToDays(id, store);
        setInitialized(true);
      });
    });
  }

  function onAuthStatusChange(user) {
    if (!user) {
      setUid('');
      return;
    }

    const { uid } = user;
    setUid(uid);
    getThisTheFuckOutOfThisFile(uid);
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onAuthStatusChange)
    return () => unsubscribe();
  }, []);

  if (!initialized) {
    return (<div>checking authentication...</div>);
  }

  const authenticationState = {
    uid,
    login: setUid,
    logout: () => setUid('')
  };

  return (
    <AuthenticationContext.Provider value={ authenticationState }>
      { props.children }
    </AuthenticationContext.Provider>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (a) => dispatch(login(a)),
  startSetUserDetails: () => dispatch(startSetUserDetails()),
  startSetDays: () => dispatch(startSetDays()),
  subscribeToDays: (id, store) => dispatch(subscribeToDays(id, store))
});

export default connect(undefined, mapDispatchToProps)(AuthenticationLayer);


/*

THIS FILE ISN'T AS BAD AS IT LOOKS

We've managed to get the authentication layer out of Redux's grasp!

The problem that remains:

We had previously daisy-chained firebase calls to get NAME, PROFILEURL, DAYS ARRAY and we didn't do any renders until that was already back...

Yeah so we don't need that kind of pattern. Let's :
1- get UserDetails: { name, profileUrl } immediately using a firebase async method call and store it with the AUTH context
2- reroute consumers to grab from AUTH context
3- go to whomever is trying to consume the days array. this should just go fetch its own damn data when its first drawn
4- rip out anything related to redux
5- make sure logout cleans out userDetails, login/logout works as intended

go find something else to fuckin' clean up


*/