const memoryReducerDefaultState = {};

export default (state = memoryReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_MEMORIES':
        return { ...state, memories: action.memories };
    default:
      return state;
  }
};
