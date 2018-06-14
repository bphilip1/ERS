import express from 'express';
import * as adminService from '../../services/admin-service';
import * as employeeService from '../../services/employee-service';
module.exports = app => {
  app.get('/reimbursements/all', (req, resp) => {
    console.log('/reimbursements/all');
  });

  app.get('/reimbursements/:status', (req, resp) => {
    console.log('by status:');

    // adminService
    //   .findTicketsByStatus(req.body.maybeReim)
    //   .then(reimbursement => {
    //     resp.json({ reimbursements: reimbursement.Items });
    //   });
    // });
  });

  app.post('/reimbursements/updateStatus', (req, resp) => {
    console.log('/reimbursements/updateStatus');
    adminService.upateStatus(req.body.user);
  });

  app.post('/verdict', (req, resp) => {
    console.log('verdict data:', req.body);
  });
};
