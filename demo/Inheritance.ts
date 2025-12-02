//Inheritance property in a TypeScript class
// Parent class
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    speak(): void {
        console.log(`${this.name} makes a noise.`);
    }
    display(): void {
        console.log(`Animal Name: ${this.name}`);
    }
}
class Dog extends Animal {
    color?: string;
    constructor(name: string, color?: string) {
        super(name); // Call the parent class constructor
        this.color = color ?? 'brown';
    }

    setColor(color: string): void {
        this.color = color;
    }

    //method overriding 
    speak(): void {
        console.log(`${this.name} barks.`);
    }
}

// Child class inheriting from Animal
class Cat extends Animal {
    speak(): void {
        console.log(`${this.name} meows.`);
    }
}
// Example usage

//basic inheritance example
console.log('--- Basic Inheritance example ---');
const dog = new Dog('Rex', 'black');
dog.speak(); // Output: Rex barks.
console.log(dog.color);
dog.setColor('golden');
console.log(dog.color); // Output: golden
dog.display

//example without providing color
const dogy = new Dog('Rex');
console.log(dogy.color); // Output: brown

//method overriding example
console.log('--- Method overriding example ---');
const cat = new Cat('Whiskers');
cat.speak(); // Output: Whiskers meows.(); called from child class
cat.display(); // Output: Animal Name: Whiskers called from parent class

//call parent class method
console.log('--- Calling parent class method overriden case---');
let animal:Animal = new Dog('Buddy');
animal.speak(); // Output: Generic Animal makes a noise.    
animal.display(); // Output: Animal Name: Buddy
//animal.setColor(""); // Error: Property 'setColor' does not exist on type 'Animal'.

//property overriding
console.log('--- Property overriding example ---');
class Bird extends Animal {
    name: string; // overriding property
    constructor(name: string) {
        super(name);
        this.name = `Bird: ${name}`; // custom behavior
    }
    speak(): void {
        //super.name; // accessing parent class property- not accessible using super keyword
        console.log(`${this.name} chirps.`);
    }
}
const bird = new Bird('Tweety');
bird.speak(); // Output: Bird: Tweety chirps. 
bird.display(); // Output: Animal Name: Tweety

//using bothp parent and child class methods
console.log('--- Using both parent and child class methods ---');
class Horse extends Animal {
    speak(): void {
        super.speak(); // Call parent class method
        console.log(`${this.name} neighs.`); // Child class specific behavior
    }
}
const horse = new Horse('Spirit');
horse.speak(); 

//Access modifiers with inheritance
console.log('--- Access Modifiers with Inheritance ---');
class Vehicle {
    public make: string
    protected model: string
    private year: number
    constructor(make: string, model: string, year: number) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    displayInfo(): void {
        console.log(`Vehicle: ${this.make} ${this.model} (${this.year})`);
    }
}
class Car extends Vehicle {
    displayCarInfo(): void {
        // Accessing public and protected members from parent class
        console.log('--- Car Info --- Accessing public and protected members from parent class---');
        console.log(`Car Make: ${this.make}`); // Accessible
        console.log(`Car Model: ${this.model}`); // Accessible
        //console.log(`Car Year: ${this.year}`); // Error: Property 'year' is private and only accessible within class 'Vehicle'.
    }   
}
const car = new Car('Toyota', 'Camry', 2020);
car.displayInfo();
car.displayCarInfo();
//car.model = 'Corolla'; // Error: Property 'model' is protected and only accessible within class 'Vehicle' and its subclasses.
//car.make = 'Honda';
//console.log(car.model); // Error: Property 'model' is protected and only accessible within class 'Vehicle' and 
// its subclasses.

//console.log(car.year); // Error: Property 'year' is private and only accessible within class 'Vehicle'.
