import React from 'react';

export const userReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.user.username,
        role: action.user.role
      };
    case 'SIGNUP':
      return {
        username: action.user.username,
        role: action.user.role
      };
    default:
      return state;
  }
};
