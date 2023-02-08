// Convert this snippet into a pure one (you can make more than one function if you feel the need to):
const people = [
  { firstname: "Bill", lastname: "Harold", age: 54 },
  { firstname: "Ana", lastname: "Atkins", age: 42 },
  { firstname: "John", lastname: "Doe", age: 57 },
  { firstname: "Davy", lastname: "Johnson", age: 34 },
];

const parsePeople = (people) => {
  // const parsedPeople = [];

  // for (let i = 0; i < people.length; i++) {
  //   people[i].firstname = people[i].firstname.toUpperCase();
  //   people[i].lastname = people[i].lastname.toUpperCase();
  // }

  // const compareAges = (person1, person2) => person1.age - person2.age;

  // return people.sort(compareAges);

  return people.map(p => ({ firstname: p.firstname.toUpperCase(), ...p })).sort((a, b) => a.age - b.age);
};

console.log(parsePeople(people), people);