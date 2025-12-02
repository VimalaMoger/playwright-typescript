//using interface
console.log("-----Person Interface--------------------");
interface Person {
    name: string;
    age: number;
    getDetails: () => string;
}

let personInterface: Person = {
    name: "Jane",
    age: 25,
    getDetails: function() {
        return `${this.name} is ${this.age} years old.`;
    }
};

console.log(personInterface.getDetails());


//using optional property
console.log("-----Car with optional property--------------------");
interface Car {
    make: string;
    model: string;
    year?: number; // optional property
}
let myCar:Car = {
    make: "Toyota",
    model: "Corolla"
};
console.log(`Car Make: ${myCar.make}, Model: ${myCar.model}, Year: ${myCar.year ?? "N/A"}`);

//readonly property
console.log("-----Book with readonly property--------------------");
interface Book {
    readonly title: string;
    readonly author: string;
    pages: number;

    display(): void;
}
let myBook: Book = {
    title: "TypeScript Basics",
    author: "John Doe",
    pages: 200,
    display() {
        console.log(`${this.title} by ${this.author}, Pages: ${this.pages}`);
    }
};
myBook.pages = 250; // allowed
console.log(`Book: ${myBook.title} by ${myBook.author}, Pages: ${myBook.pages}`);
myBook.display();
// myBook.title = "New Title"; // Error: Cannot assign to 'title' because it is a read-only property. 

//interface inheritance
// Parent interface
console.log("-----Interface Inheritance--------------------");
interface EmployeeInfo extends Person {
    name: string;
    age: number;
    employeeId: number;
    getDetails: () => string;
}
//extending EmployeeInfo
interface EmployeeAddress extends EmployeeInfo {
    street: string;
    city: string;
    getContactInfo: () => string;
}
// create an object implementing the extended interface
console.log("----------Employee Details--------------------");
let emp: EmployeeAddress = {
    name: "Alice",
    age: 30,
    employeeId: 101,
    street: "456 Elm St",
    city: "Metropolis",
    getContactInfo() {
        return `${this.name} (ID: ${this.employeeId}) is ${this.age} years old.`;
    },
    getDetails: function (): string {
        throw new Error("Function not implemented.");
    }
};

console.log("----------Employee Contact Info--------------------");
class personAddress implements Person {
   
    name: string;
    age: number;
    //new property
    zipCode?: string;
    //static property
    static country: string = "USA";
     
    constructor(name:string, age:number=0, zipCode?:string){
        this.name = name;               
        this.age = age;
        this.zipCode = zipCode;
    }
    getDetails(){
        return `${this.name} is ${this.age} years old.`;
    }
}
//create an instance of the class
let personAddr = new personAddress("Bob", 35, "12345");

console.log(personAddr.getDetails());
//accessing static property
console.log(`Country: ${personAddress.country}`);
console.log(`Person Details: ${personAddr.name}, Age: ${personAddr.age}, ZipCode: ${personAddr.zipCode ?? "99999"}`);

//