import express from "express";
import {Topping, toppingChoices} from "./toppings";

const routes = express.Router();


// specialty pizza array
let specialtyPizzas: Pizza[] = [
    {
        name: "Carnivore Carbonara",
        size: "large",
        price: 19,
        toppings: [{name: "Pepperoni", price: 0}, {name: " Braised Mouse", price: 0}, {name: " Yard Bird", price: 0}, {name: " Groundhog Sausage", price: 0}, {name: " Braised Bunny", price: 0}],
        isGlutenFree: "No"
    },
    {
        name: "Grass Gremlin Gourmet",
        size: "large",
        price: 13,
        toppings: [{name: "Fresh-cut Grass", price: 0}, {name: " Tall Grass", price: 0}, {name: " Grass Clippings", price: 0}, {name: " Regurgitable White Sauce", price:0}],
        isGlutenFree: "No"
    },
    {
        name: "Floppy Fish Delight",
        size: "large",
        price: 23,
        toppings: [{name: "Fishtank Flouder", price: 0}, {name: " Grouper", price: 0}, {name: " Bowl-raised Goldfish", price: 0}, {name: " Backyard Koi", price: 0}, {name: " Shredded Tuna", price: 0}],
        isGlutenFree: "No"
    },
]


// INTERFACES
// pizza object
interface Pizza {
    name?: string,
    size: string,
    price: number,
    toppings: Topping[],
    isGlutenFree: string,
    specialInstructions?: boolean
}



// review form
interface Review {
    name: string,
    comments: string,
    rating: string
}

// track pizza IDs as added to cart
let nextId: number = 4;

// ROUTES
// get
routes.get("/", (req, res) => {
    res.render("homepage", {specialtyPizzas});
})

routes.get("/specialtyPizzas", (req, res) => {
    // finds specialty pizza in array by name, as specified on homepage.hbs
    let results: Pizza|undefined = specialtyPizzas.find((pizza) => {
        // console.log(pizza.toppings.topping.name)
        return pizza.name === String(req.query.name)
    })
    // render chosen pizza
    res.render("specialtyPizzas", {
        
        pizza: results
    })
    
    console.log(results);
})

routes.get("/review", (req, res) => {
    res.render("review");
})

routes.get("/custom", (req, res) => {
    res.render("custom", {
        topping: toppingChoices
    });
})

// POST
// renders new page based on submit action of custom pizza building
routes.post("/customConfirmation", (req, res) => {
    // pizza interface variables
    const size: string = req.body.sizeInput ? String(req.body.sizeInput) : "";
    const instructions: string = req.body.instructions ? String(req.body.instructions) : ""
    const chosenToppings: any = req.body.toppings ? String(req.body.toppings) : [];
    console.log(req.body);
    console.log(`req.body.toppings ${req.body.toppings}`);
    // chosenToppings.push(req.body.topping);
    console.log(`Chosen Toppings: ${chosenToppings}`);
    const isGlutenFree: string = req.body.gluten ? "yes" : "no"
    // pricing configuration variables
    let sizePrice: number = size === "small" ? 7 : size === "medium" ? 10 : 12;
    console.log(`sizeprice: ${sizePrice}`)
    let toppingsMultiplyer: any = sizePrice === 7 ? (.50 * chosenToppings.length).toFixed(2) : sizePrice === 10 ? (1 * chosenToppings.length).toFixed(2) : (1.25 * chosenToppings.length).toFixed(2)
    // console.log(`toppingsmultiplyer: ${toppingsMultiplyer}`);
    // Price Formula based on above variables
    const price: number = sizePrice + toppingsMultiplyer;
    const results: Pizza = {
        // name?: "name",
        size: size,
        price: price,
        toppings: chosenToppings,
        isGlutenFree: isGlutenFree,
    }
    console.log(results);

    res.render("customConfirmation", {
        Pizza: results
    });


})

// renders new page based on submit action of review section
routes.post("/reviewConfirmation", (req, res) => {
    const name: string = req.body.name ? String(req.body.name) : "";
    const comments: string = req.body.comments ? String(req.body.comments) : "";
    const rating: string = req.body.rating ? String(req.body.rating) : "";

    const results: Review = {
        name: name,
        comments: comments,
        rating: rating
    }

    res.render("reviewConfirmation", {
        Review: results
    });


})






// EXPORT ALL ROUTES
export default routes;