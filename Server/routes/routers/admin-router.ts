import express from 'express';
import * as adminService from '../../services/admin-service';
import * as employeeService from '../../services/employee-service';
module.exports = app => {
  app.post('/updateStatus', (req, resp) => {
    console.log('', req.body);
  });

  app.post('/verdict', (req, resp) => {
    console.log('verdict data:', req.body);
    adminService.upateStatus(req.body.dataObj);

    employeeService.findTicket(req.body.dataObj).then(updatedTickets => {
      console.log('updated tickets:', updatedTickets);
      const updatedTicketInfo = updatedTickets.Items[0];
      resp.json(updatedTicketInfo);
    });
  });
};
