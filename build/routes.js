"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const toppings_1 = __importDefault(require("./toppings"));
const routes = express_1.default.Router();
// specialty pizza array
let specialtyPizzas = [
    {
        name: "Carnivore Carbonara",
        size: "large",
        price: 19.00,
        toppings: ["Pepperoni", " Braised Mouse", " Yard Bird", " Groundhog Sausage", " Braised Bunny"],
        isGlutenFree: "No"
    },
    {
        name: "Grass Gremlin Gourmet",
        size: "large",
        price: 13.00,
        toppings: ["Fresh-cut Grass", " Tall Grass", " Grass Clippings", " Regurgitable White Sauce"],
        isGlutenFree: "No"
    },
    {
        name: "Floppy Fish Delight",
        size: "large",
        price: 23.00,
        toppings: ["Fishtank Flouder", " Grouper", " Bowl-raised Goldfish", " Backyard Koi", " Shredded Tuna"],
        isGlutenFree: "No"
    },
];
// ROUTES
// get
routes.get("/", (req, res) => {
    res.render("homepage", { specialtyPizzas });
});
routes.get("/specialtyPizzas", (req, res) => {
    // finds specialty pizza in array by name, as specified on homepage.hbs
    let results = specialtyPizzas.find((pizza) => {
        // console.log(pizza.toppings.topping.name)
        return pizza.name === String(req.query.name);
    });
    // render chosen pizza
    res.render("specialtyPizzas", {
        pizza: results
    });
    console.log(results);
});
routes.get("/review", (req, res) => {
    res.render("review");
});
routes.get("/custom", (req, res) => {
    res.render("custom", {
        topping: toppings_1.default
    });
});
// POST
// renders new page based on submit action of custom pizza building
routes.post("/customConfirmation", (req, res) => {
    // pizza interface variables
    const size = req.body.sizeInput ? String(req.body.sizeInput) : "";
    const specialInstructions = req.body.instructions ? String(req.body.instructions) : "";
    let chosenToppings = req.body.toppings ? Object(req.body.toppings) : "";
    const isGlutenFree = req.body.gluten ? "Yes" : "No";
    // pricing configuration variables
    let sizePrice = size === "small" ? 7 : size === "medium" ? 10 : 12;
    let toppingsMultiplyer = sizePrice === 7 ? Number((.50 * chosenToppings.length)) : sizePrice === 10 ? Number((1 * chosenToppings.length)) : Number((1.25 * chosenToppings.length));
    // Price Formula based on above variables
    let price = Number(sizePrice.toFixed(2)) + Number(toppingsMultiplyer.toFixed(2));
    isGlutenFree == "Yes" ? price += 2 : price;
    chosenToppings.includes(" Catnip ($2.00) ") ? price += 1.50 : price;
    chosenToppings.includes(" Extra Cheese ($2.00) ") ? price += 1.50 : price;
    const results = {
        size: size,
        price: Number(price.toFixed(2)),
        toppings: chosenToppings,
        isGlutenFree: isGlutenFree,
        specialInstructions: specialInstructions
    };
    console.log(results);
    res.render("customConfirmation", {
        Pizza: results
    });
});
// renders new page based on submit action of review section
routes.post("/reviewConfirmation", (req, res) => {
    const name = req.body.name ? String(req.body.name) : "";
    const comments = req.body.comments ? String(req.body.comments) : "";
    const rating = req.body.rating ? String(req.body.rating) : "";
    const results = {
        name: name,
        comments: comments,
        rating: rating
    };
    res.render("reviewConfirmation", {
        Review: results
    });
});
// EXPORT ALL ROUTES
exports.default = routes;
