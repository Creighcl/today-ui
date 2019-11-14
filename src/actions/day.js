import database from '../firebase/firebase';

export const addDay = (day) => ({
  type: 'ADD_DAY',
  day
});

export const setDays = (days) => ({
  type: 'SET_DAYS',
  days
});


export const startSetDays = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    
    return database.ref(`users/${uid}/days`)
    .once('value')
    .then((snapshot) => {
      const days = [];
      snapshot.forEach((childSnapshot) => {
        days.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      console.log(days, 'days');
      dispatch(setDays(days));
    });
  };
};

export const updateDay = (id,updates) => ({
  type: 'UPDATE_DAY',
  id,
  updates
});


export const startUpdateDay = (id,updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const dayRef = `users/${uid}/days/${id}`;
    console.log('update for',dayRef,updates);
    return database.ref(dayRef)
                .update(updates)
                .then((ref) => {
                  dispatch(updateDay(id,updates));
                });
  };
};

export const subscribeToDays = (uid,store) => {
  var daysRef = database.ref(`users/${uid}/days`);
  daysRef.on('child_added', function(data) {
    store.dispatch(addDay(data.val()));
  });

  daysRef.on('child_changed', function(data) {
    console.log('change!!');
    store.dispatch(updateDay(data.key, data.val()));
  });

  // daysRef.on('child_removed', function(data) {
  // deleteComment(postElement, data.key);
  // });
};

