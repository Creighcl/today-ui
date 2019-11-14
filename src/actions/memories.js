import database from '../firebase/firebase';

  export const setMemories = (memories) => ({
    type: 'SET_MEMORIES',
    memories
  });

//   export const startSetMemories = (date, memory) => {
//     return (dispatch, getState) => {
//       const uid = getState().auth.uid;
//       console.log(`users/${uid}/days/${date}/memories`);
//       return database.ref(`users/${uid}/days/${date}/memories`).push({
//         ...memory,
//        // timestamp: firebase.ServerValue.TIMESTAMP
//       }).then((snapshot) => {
//           console.log(snapshot);
        
//       });
//     //   return database.ref(`users/${uid}/memories`).once('value').then((snapshot) => {
//     //     console.log(snapshot.val());

//     //     dispatch(setMemories(snapshot.val()));
//     //   });
//     };
//   };