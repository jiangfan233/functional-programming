import { curry } from "../curry";
import {
  compose,
} from "../compose";
import {
  trace,
  intercalate,
  toUpperCase,
  head,
  split,
  map,
  replace,
  tirm,
} from "../common";

// The world is a vampire.
const dasherize = compose(
  intercalate("-"),
  map(toUpperCase),
  split(" "),
  replace(/\s{2,}/ig, " "),
  tirm()
)

// console.log(dasherize("  the   world   is a   vampire"))