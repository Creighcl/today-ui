import database from '../firebase/firebase';

export const updateName = (nameData = "unknown") => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`users/${uid}/details/name`).set(nameData.name).then((ref) => {
        dispatch(setName(nameData.name));
      });
    };
  };


  export const setName = (name) => ({
    type: 'SET_NAME',
    name
  });

  export const fetchName = () => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`users/${uid}/details/name`).once('value').then((snapshot) => {
        console.log('fetched name is', snapshot.val());

        dispatch(setName(snapshot.val()));
      });
    };
  };


export const updateUserDetails = (updates) => ({
  type: 'UPDATE_USER_DETAILS',
  updates
});

export const setUserDetails = (details = {"name":"unknown"}) => ({
  type: 'SET_USER_DETAILS',
  details
});

export const startUpdateUserDetails = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const udRef = `users/${uid}/details`;
    return database.ref(udRef)
                   .update(updates)
                   .then((snapshot) => {
                      dispatch(updateUserDetails(updates));
                   });
  };
};

export const startSetUserDetails = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const udRef = `users/${uid}/details`;
    return database.ref(udRef)
                   .once('value')
                   .then((snapshot) => {
                     console.log(snapshot.val(), `user details from ${uid}`);
                      dispatch(setUserDetails(snapshot.val()));
                   });
  };
}