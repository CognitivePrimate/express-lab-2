import express from "express";

const routes = express.Router();


// specialty pizza array
let specialtyPizzas: Pizza[] = [
    {
        name: "Carnivore Carbonara",
        price: 19,
        toppings: ["Pepperoni", " Braised Mouse", " Yard Bird", " Groundhog Sausage", " Braised Bunny"],
        id: 1
    },
    {
        name: "Grass Gremlin Gourmet",
        price: 13,
        toppings: ["Fresh-cut Grass", " Tall Grass", " Grass Clippings", " Regurgitable White Sauce"],
        id: 2
    },
    {
        name: "Floppy Fish Delight",
        price: 23,
        toppings: ["Fishtank Flouder", " Grouper", " Bowl-raised Goldfish", " Backyard Koi", " Shredded Tuna"],
        id: 3
    },
]

// pizzas array
let cart: Pizza[] = [];

// INTERFACES
// pizza object
interface Pizza {
    name?: string,
    price: number,
    toppings: string[],
    id: number
}

// review form
interface Review {
    name: string,
    comments?: string,
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
    // FIX THE RESULTS TYPE BELOW
    let results: Pizza|undefined = specialtyPizzas.find((pizza) => {
        console.log(pizza.id);
        return pizza.id === Number(req.query.id)
        
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

// "review/confirmation?"
routes.post("/confirmation", (req, res) => {
    const name: string = req.body.name ? String(req.body.name) : "";
    const comments: string = req.body?.comments ? String(req.body?.comments) : "";
    const rating: number = req.body.value ? Number(req.body.value) : 0;

    const newReview: Review = {
        name: name,
        comments: comments,
        rating: rating

    }
})






// EXPORT ALL ROUTES
export default routes;