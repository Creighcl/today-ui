const nameReducerDefaultState = {};

export default (state = nameReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_NAME':
        return { ...state, name: action.name };
    case 'UPDATE_USER_DETAILS':
        return { ...state, ...action.updates };
    case 'SET_USER_DETAILS':
        return action.details;
    default:
      return state;
  }
};