



// toppings array & variables
// export let chosenToppings: Topping[] = [];
// let smallToppingsPrice: number = .50 * chosenToppings.length;

export const toppingChoices: Topping[] = [
    {
        name: "Fishtank Flounder",
        price: 1
    },
    {
        name: "Braised Bunny",
        price: 1
    },
    {
        name: "Bowl-raised Goldfish",
        price: 1
    },
    {
        name: "Groundhog Sausage",
        price: 1
    },
    {
        name: "Yard Bird",
        price: 1
    },
    {
        name: "Backyard Koi",
        price: 1
    },
    {
        name: "Sewer Rat",
        price: 1
    },
    {
        name: "Shredded Tuna",
        price: 1
    },
    {
        name: "Stolen Sandwich Bread",
        price: 1
    },
    {
        name: "Yogurt",
        price: 1
    },
    {
        name: "Too-slow Fly",
        price: 1
    },
    {
        name: "Floor Spider",
        price: 1
    },
    {
        name: "Grilled Possum Tail",
        price: 1
    },
    {
        name: "Catnip",
        price: 1
    },
    {
        name: "Extra Cheese",
        price: 1
    }
];


// topping object
export interface Topping {
    name: string,
    price: number
}

