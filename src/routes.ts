import express from "express";
import toppingChoices from "./toppings";

const routes = express.Router();


// specialty pizza array
let specialtyPizzas: Pizza[] = [
    {
        name: "Carnivore Carbonara",
        size: "large",
        price: 19,
        toppings: ["Pepperoni", " Braised Mouse", " Yard Bird", " Groundhog Sausage", " Braised Bunny"],
        isGlutenFree: "No"
    },
    {
        name: "Grass Gremlin Gourmet",
        size: "large",
        price: 13,
        toppings: ["Fresh-cut Grass", " Tall Grass", " Grass Clippings", " Regurgitable White Sauce"],
        isGlutenFree: "No"
    },
    {
        name: "Floppy Fish Delight",
        size: "large",
        price: 23,
        toppings: ["Fishtank Flouder", " Grouper", " Bowl-raised Goldfish", " Backyard Koi", " Shredded Tuna"],
        isGlutenFree: "No"
    },
]


// INTERFACES
// pizza object
interface Pizza {
    name?: string,
    size: string,
    price: number,
    toppings: string[],
    isGlutenFree: string,
    specialInstructions?: string
}



// review form
interface Review {
    name: string,
    comments: string,
    rating: string
}

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
    const specialInstructions: string = req.body.instructions ? String(req.body.instructions) : ""
    let chosenToppings: string[] = req.body.toppings ? Object(req.body.toppings) : "";
    const isGlutenFree: string = req.body.gluten ? "Yes" : "No";
    
    // pricing configuration variables
    let sizePrice: number = size === "small" ? 7 : size === "medium" ? 10 : 12;
    let toppingsMultiplyer: number = sizePrice === 7 ? Number((.50 * chosenToppings.length)) : sizePrice === 10 ? Number((1 * chosenToppings.length)) : Number((1.25 * chosenToppings.length));
 
    // Price Formula based on above variables
    let price: number = Number(sizePrice.toFixed(2)) + Number(toppingsMultiplyer.toFixed(2));
    isGlutenFree == "Yes" ? price += 2 : price;
   
    const results: Pizza = {
        // name?: "name",
        size: size,
        price: Number(price.toFixed(2)),
        toppings: chosenToppings,
        isGlutenFree: isGlutenFree,
        specialInstructions: specialInstructions
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