import { curry } from "../curry";
import { Maybe } from "../containers/Maybe";
import { Identity } from "../containers/Functors";
import { pipe } from "../pipe";
import { chain } from "../common";

// 1、Create a function getStreetName that, like the name suggests, 
// returns the street name of the restaurant.

// Use safeProp (and chain, along with any other functional helpers you need) to do so in a pure way.

const restaurant = {
    name: "The Creamery",
    address: {
      city: "Los Angeles",
      street: {
        name: "Melrose Avenue",
      },
    },
    rating: 8,
  };

// safeProp :: String -> Object -> Maybe a
const safeProp = curry((prop, obj) =>
    obj[prop] === undefined || obj[prop] === null
        ? Maybe.Nothing()
        : Maybe.Just(obj[prop])
);

// getStreetName :: Object -> Maybe String
const getStreetName = pipe(
    safeProp("address"),
    chain(safeProp("street")),
    chain(safeProp("name")),
    console.log
);

getStreetName(restaurant);