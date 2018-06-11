import express from "express";

module.exports = app => {
  app.get("/employee/viewAll", (req, resp) => {
    console.log("/employee/viewAll");
  });
  app.post("/employee/create", (req, resp) => {
    console.log("/employee/post");
  });
};
