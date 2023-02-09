import { trace } from "../common";
import { compose } from "../compose";
import { Identity } from "../containers/Container";
import { maybe, Maybe } from "../containers/Maybe";
import { curry } from "../curry";


const withdraw = curry((amount: number, { balance }) => {
  return Maybe.of(amount > balance ? null : { balance: balance - amount })
})

const remainingBalance = ({ balance }) => `Your balance is ${balance}`;

// const getTwenty = compose(map(remainingBalance), withdraw(20));

const getTwenty = compose(trace("info:"), maybe("You are broken!", remainingBalance), withdraw(20))

getTwenty({ balance: 10 });



Maybe.of(5).chain((x: number) => x + 12).inspect()

Maybe.of(null).chain((x: string) => x + "sd")

