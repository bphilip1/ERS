import express from 'express';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import * as userService from '../../services/user-service';
import * as employeeService from '../../services/employee-service';
// routes: login(put), signup(put), find one user (get)
// employess: create reimbursement(put), findAll reimbursements (get)
// admin: view all reimbursements from all employees, update status

module.exports = app => {
  app.post('/login', (req, resp) => {
    userService.login(req.body.user).then(maybeUserData => {
      employeeService.findTicket(req.body.user).then(maybeReimData => {
        const maybeReim = maybeReimData.Items;
        const maybeUser = maybeUserData.Items[0];
        if (maybeUser) {
          console.log('hash pass:', maybeUser.password);
          console.log('client plain text pass:', req.body.user.password);
          if (bcrypt.compareSync(req.body.user.password, maybeUser.password)) {
            console.log('passwords match----------------');
            const fullData = {
              reimbursements: maybeReim,
              ...maybeUser
            };
            console.log(fullData);
            resp.json(fullData);
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
