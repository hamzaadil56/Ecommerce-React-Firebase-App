import { ACTIONS } from "../action";
const authReducer = (state = false, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return (state = true);
    case ACTIONS.LOGOUT:
      return (state = false);
    default:
      return state;
  }
};
export default authReducer;
