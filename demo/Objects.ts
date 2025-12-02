//using object
let person = {
    name: "John",   
    age: 30,
    getDetails: function():string {
        return `${this.name} is ${this.age} years old.`;
    }               
};
console.log(person.getDetails());
console.log(typeof person);
console.log(person.age, person.name);
console.log(person["age"], person['name']);
console.log(Object.keys(person));
console.log(Object.values(person));
console.log(Object.entries(person));
console.log(person["getDetails"])


//modify the value
person.age = 31;
person["name"] = "Doe";
console.log(person.getDetails());   

//inline type annotation= creating object with specific structure- type annotation- 
let employee: { 
    name: string;   
    age: number;
    getDetails: () => string;
    } = {
    name: "Alice",
    age: 28,
    getDetails () {
        return `${this.name} is ${this.age} years old.`;
    }
};  

//using type alias to define a custom type for employee objects
type Employee = {
    name: string;
    age: number;
    getDetails: () => string;
};
let employeeTypeAlias: Employee = {
    name: "Bob",
    age: 35,
    getDetails () {
        return `${this.name} is ${this.age} years old.`;
    }
};
console.log(employeeTypeAlias.name);
console.log(employeeTypeAlias.getDetails());

for (const key in employeeTypeAlias) {
    console.log(`${key}: ${employeeTypeAlias[key as keyof Employee]}`);
    console.log(employeeTypeAlias["name"]);
}   

//Intersection Types
type Address = {
    street: string;
    city: string;
};
type EmployeeWithAddress = Employee & Address & {
    getContactInfo: () => string;
}

let empWithAddress: EmployeeWithAddress = {
    name: "Eve",
    age: 29,
    street: "123 Main St",
    city: "Wonderland",
    getDetails() {
        return `${this.name} is ${this.age} years old.`;
    },
    getContactInfo() {
        return `${this.name}, ${this.street}, ${this.city}`;
    }
};
console.log(empWithAddress.getContactInfo());
console.log(empWithAddress.name);
console.log(empWithAddress.street);


//using class
class EmployeeClass {
    readonly name?: string
    age?: number;    
    email? : string;

    //constructor overloading
    constructor();
    constructor(name: string);
    constructor(name: string, age: number);
    constructor(name: string, age: number, email: string);

    constructor(name?: string, age?: number, email?: string) {
        if(name !== undefined && age !== undefined && email !== undefined) {
        this.name = name;
        this.age = age;
        this.email = email;
        console.log("All three parameters provided. constructor with three parameters called.");
        } else if(name !== undefined && age !== undefined) {
            this.name = name;
            this.age = age;
            console.log("Name and age parameters provided. constructor with two parameters called.");
        } else if(name !== undefined) {
            this.name = name;
            console.log("Only name parameter provided. constructor with one parameter called.");
        } else {
            this.name = "Default Name";
            console.log("No parameters provided. constructor with no parameters called.");
        }      
    }
    getFullName(lastName : string): string {
        return `${this.name} ${lastName}`;
    }
    getDetails(): string {
        return `${this.getFullName("Lopez")} is ${this.age} years old.`;
    }
}
//create an instance of the class
let empClass = new EmployeeClass("Charlie", 40);
//empClass.name = "New Name"; // Error: Cannot assign to 'name' because it is a read-only property.
console.log(empClass.name);
let empClass2 = new EmployeeClass("Charlie", 40, "john@gmail.com");
console.log(empClass2.getDetails());

//overloading methods in class
class Calculator {
    
    add(a: number, b: number): number;
    add(a: string, b: string): string;
    add(a: string, b: number, c?: number): string;
    add(a: any, b: any, c?: any): any {
        if (typeof a === 'string' && typeof b === 'number' && c !== undefined) {
            return a.repeat(b);
        } else if (typeof a === 'string' && typeof b === 'string') {
            return a + b;
        } else
            return a + b;
        console.log("Addition performed.")
    }
}

let calc = new Calculator();
console.log(calc.add(5, 10));
console.log(calc.add("Hello, ", "world!"));
console.log(calc.add("Three", 3));
console.log(calc.add("Five", 2, 5));

