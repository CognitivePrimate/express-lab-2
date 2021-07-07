// imported modules
import path from "path";
import express from "express";
import cors from "cors";
import nodemon from "nodemon";

// local imports
import routes from "./routes";
// create instance of express
const app = express();
// enable ability to parse body of requests
app.use(express.json());
// enables cors
app.use(cors());

// Handlebars config
app.use(express.urlencoded({ extended: false }));
// declare where handlebars views are
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

// declare port server runs on 
const port = 3000;

// add routes to application
app.use("/", routes);

// start server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
})

