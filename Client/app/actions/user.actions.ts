import React from 'react';
// actions have type and data

export const login = userdata => ({
  user: userdata,
  type: 'LOGIN'
});

export const signUp = userdata => ({
  user: userdata,
  type: 'SIGNUP'
});
