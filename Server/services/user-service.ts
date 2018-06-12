import * as userDao from '../dao/user-dao';

export function signUp(userData: any) {
  console.log('now in user service');
  return userDao.signUp(userData);
}

export function findUser(username: string) {
  return userDao.findUser(username);
}

export function login(loginInfo: any) {
  return userDao.findUser(loginInfo.username);
}
