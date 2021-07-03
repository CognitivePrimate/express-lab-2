import express from "express";

const routes = express.Router();


// specialty pizza array
let specialtyPizzas: Pizza[] = [
    {
        name: "Carnivore Carbonara",
        price: 19,
        toppings: ["Pepperoni", "Braised Mouse", "Yard Bird", "Groundhog Sausage", "Braised Bunny"],
        id: 1
    },
    {
        name: "Grass Gremlin Gourmet",
        price: 13,
        toppings: ["Fresh-cut Grass", "Tall Grass", "Regurgitable White Sauce"],
        id: 2
    },
    {
        name: "Floppy Fish Delight",
        price: 23,
        toppings: ["Wild Caught Tuna", "Grouper", "Goldfish", "Backyard Koi"],
        id: 3
    },
]

// pizza object
interface Pizza {
    name?: string,
    price: number,
    toppings: string[],
    id: number
}

// track pizza IDs as added to cart
let nextId: number = 4;

// ROUTES
// get
routes.get("/", (req, res) => {
    res.render("homepage")
})

routes.get("/specialtyPizzas", (req, res) => {
    let results: Pizza[] = specialtyPizzas.filter((pizza) => {
        
        return pizza.id === Number(req.query.id)
        
    })
    // render chosen pizza
    res.render("specialty-pizzas", {
        
        pizza: results
    })
    console.log(results);

})






// EXPORT ALL ROUTES
export default routes;