import { reducerCases } from "./StateContext";

// Initial state for the application
export const initialState = {
  userInfo: undefined, // User information
};

// Reducer function to manage state changes
const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      localStorage.setItem('userInfo', JSON.stringify(action.userInfo));
      return {
        ...state,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
};

export default reducer;
