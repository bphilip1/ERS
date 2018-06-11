import express from "express";

module.exports = app => {
  app.get("/reimbursements/all", (req, resp) => {
    console.log("/reimbursements/all");
  });
  app.get("/reimbursements/:user", (req, resp) => {
    console.log("/reimbursements/:user");
  });
  app.post("/reimbursements/updateStatus", (req, resp) => {
    console.log("/reimbursements/updateStatus");
  });
};
