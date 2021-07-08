"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imported modules
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// local imports
const routes_1 = __importDefault(require("./routes"));
// create instance of express
const app = express_1.default();
// enable ability to parse body of requests
app.use(express_1.default.json());
// enables cors
app.use(cors_1.default());
// Handlebars config
app.use(express_1.default.urlencoded({ extended: false }));
// declare where handlebars views are
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// declare port server runs on 
const port = 3000;
// add routes to application
app.use("/", routes_1.default);
// start server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
