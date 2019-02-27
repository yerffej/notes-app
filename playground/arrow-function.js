var square = x => x * x;
console.log(square(7));

var user = {
    name: "Andrew",
    sayHi: () => {
        // arrow function as methods in objects
        // doent work with the following attempts
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    },
    sayHiAlt () {
        // this synatx can be used to solve
        // the 'this' problem and access arguments
        // when creating functions on object literals
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    }
};

user.sayHi(1, 2, 3);

user.sayHiAlt(1, 2, 3);
