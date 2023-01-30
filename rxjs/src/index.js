
import rx from "rxjs"

const { Observable } = rx;

const url = "https://jsonplaceholder.typicode.com/todos/1";

// rx.Observable.of(1,2,3).subscribe(value => {
//   console.log(value)
// })

// function get(url) {
//   return Observable.create(subscriber => {
//     const request = new XMLHttpRequest();
//     request.open("GET", url);
//     request.onload = () => {
//       if(request.status === 200) {
//         subscriber.next(request.response);
//         subscriber.complete();
//       } else {
//         subscriber.error(new Error(request.statusText));
//       }
//     }
//     request.onerror = () => {
//       subscriber.error(new Error("Unknown Error"));
//     }
//     request.send();
//   })
// }

// const test = get("https://jsonplaceholder.typicode.com/todos/1");

// test.subscribe(
//   value => console.log(`Result: ${value}`),
//   error => console.error(`Error: ${error}`),
//   () => console.log("Completed"),
// )

// Observable.ajax(url).subscribe(
//   data => console.log(data.response),
//   err => console.error(err) 
// )

const allMoves = Observable.fromEvent(document, "mousemove");
allMoves.subscribe(e => console.log(e));