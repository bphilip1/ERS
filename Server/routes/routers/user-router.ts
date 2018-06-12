import express from 'express';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import * as userService from '../../services/user-service';

// Do Logic here to autheniticate User LOGIN
// routes: login(put), signup(put), find one user (get)
// employess: create reimbursement(put), findAll reimbursements (get)
// admin: view all reimbursements from all employees, update status

module.exports = app => {
  app.post('/login', (req, resp) => {
    userService.login(req.body.user).then(maybeData => {
      const maybeUser = maybeData.Items[0];
      if (maybeUser) {
        if (bcrypt.compare(maybeUser.password, req.body.user.password)) {
          console.log('passwords match');
          resp.json(maybeUser);
        } else {
          console.log('invalid password');
          resp.status(400).end();
        }
      } else {
        console.log('user not found');
        resp.status(400).end();
      }
    });
  });

  app.post('/signUp', (req, resp) => {
    console.log('body contents:', req.body.user);
    userService.signUp(req.body.user).then(() => {
      userService.findUser(req.body.user.username).then(user => {
        resp.json(user.Items[0]);
      });
    });
  });
};
