import {curry} from "../curry";
import {pipe} from "../pipe";
import { Maybe } from "../containers/Maybe";
import { Identity } from "../containers/Functors";
import { map } from "../common";

// 1、Create a function that returns a phrase describing the couple 
// if the user has a partner using the given helpers and ap:

const user = {
    id: "012345",
    name: "John Doe",
    hobbies: ["Cycling", "Drawing"],
    friends: [
        {name: "Mickael Bolp",},
        // ...
    ],
    partner: {name: "Theresa Doe",},
    // ...
}
  
// safeProp :: String -> Object -> Maybe a
const safeProp = curry((prop, obj) =>
  obj[prop] === undefined || obj[prop] === null
    ? Maybe.Nothing()
    : Maybe.Just(obj[prop])
);

// getCouplePresentation :: User -> User -> String
const getCouplePresentation = curry(
  (name1, name2) => `${name1} and ${name2} are partners.`
);

// getName :: User -> String
const getName = (user) => user.name;
// I could have written: const getName = safeProp("name")
// but I didn't and that's intentional.
// We assume that a user always has a name.

// const name1 = Identity(user).map(getName);
const name1 = Maybe.of(getName(user));

// const name2 = safeProp("partner", user).map(getName);
const getParterName = pipe(safeProp("partner"), map(getName));
const name2 = getParterName(user);

const couple =  Identity(getCouplePresentation).ap(name1).ap(name2);
console.log(couple);


// 2、Refactor the previous answer using liftA2 (check out the answer of the previous question before):
// liftA2 :: Apply functor F => (a -> b -> c) -> F a -> F b -> F c
const liftA2 = curry((fn, F1, F2) => F1.map(fn).ap(F2));

console.log(liftA2(getCouplePresentation, name1, name2));