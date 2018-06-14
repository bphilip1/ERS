export const userReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.user.username,
        role: action.user.role,
        firstname: action.user.firstname
      };
    case 'SIGNUP':
      return {
        username: action.user.username,
        role: action.user.role,
        firstname: action.user.firstname
      };
    default:
      return state;
  }
};
