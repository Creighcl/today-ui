const dayReducerDefaultState = {
};

const defaultDay = {
  fucksGiven: 0,
  tdt: '',
  memories: []
};

export default (state = dayReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_DAYS':
        return action.days;
    case 'UPDATE_DAY':
      if (state.filter(({id}) => id === action.id).length == 0)
        return [
          ...state,
          {
            id: action.id,
            ...action.updates
          }  
        ];

      return state.map((day) => {
        if (day.id === action.id){
          return {
            ...day,
            ...action.updates
          }
        } else {
          return day;
        }
      });
    default:
      return state;
  }
};