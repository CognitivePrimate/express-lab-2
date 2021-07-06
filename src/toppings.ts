



// toppings array & variables
let chosenToppings: Topping[] = [];
let smallToppingsPrice: number = .50 * chosenToppings.length;

export const toppings: Topping[] = [
    {
        name: "Fishtank Flounder",
        price: 2
    },
    {
        name: "Braised Bunny",
        price: 4
    },
    {
        name: "Bowl-raised Goldfish",
        price: 3
    }
];


// topping object
export interface Topping {
    name: string,
    price: number
}

