import express from 'express';
import * as employeeService from '../../services/employee-service';

module.exports = app => {
  app.get('/employee/viewAll', (req, resp) => {
    console.log('/employee/viewAll');
  });
  app.post('/create', (req, resp) => {
    console.log('you have mail', req.body.reimbursement);
    employeeService.saveTicket(req.body.reimbursement).then(() => {
      employeeService
        .findTicket(req.body.reimbursement.username)
        .then(reimbursement => {
          resp.json(reimbursement.Items[0]);
        });
    });
  });
};
