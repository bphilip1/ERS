import express from 'express';
import * as employeeService from '../../services/employee-service';

module.exports = app => {
  app.get('/viewAll', (req, resp) => {
    console.log('we are in viewAll');
  });

  app.post('/submitTicket', (req, resp) => {
    console.log('you have mail', req.body.reimbursement);
    console.log('check username:', req.body.reimbursement.username);

    employeeService.saveTicket(req.body.reimbursement).then(() => {
      employeeService.findTicket(req.body.reimbursement).then(reimbursement => {
        resp.json({ reimbursements: reimbursement.Items });
      });
    });
  });
};
