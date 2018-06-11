import express from "express";
import { Request, Response, NextFunction } from "express";
//import * as userService from '../services/user-service';

// Do Logic here to autheniticate User LOGIN
// routes: login(put), signup(put), find one user (get)
// employess: create reimbursement(put), findAll reimbursements (get)
// admin: view all reimbursements from all employees, update status

module.exports = app => {
  app.post("/login", (req, resp) => {
    console.log("/login");
  });
  app.post("/signUp", (req, resp) => {
    console.log("/signUp");
  });
};
