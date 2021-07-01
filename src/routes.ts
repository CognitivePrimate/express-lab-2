import express from "express";

const routes = express.Router();






// ROUTES
// get
routes.get("/", () => {
    res.render("something")
})