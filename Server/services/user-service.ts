import * as userDao from '../dao/user-dao';

export function signUp(userData: any) {
  return userDao.signUp(userData);
}

export function findUser(username: string) {
  return userDao.findUser(username);
}

export function login(loginInfo: any) {
  return userDao.findUser(loginInfo.username);
}
