//touple is fixed length where each element has a specific type- better type safety- improved code readability
let person: [string, number];
person = ["John", 35];  
console.log("Person Tuple:", person);
// Output: Person Tuple: [ 'John', 35 ]

//accessing touple elements- by index- specific type for each element- better type safety- improved code readability
let list: [string, number] = ["", 0];
for (let i of person){
    list.push(i);
    list.shift();
}

console.log("Tuple Elements:",  list);

list.unshift("shree",45,"seeta",30);
console.log("Modified List:", list);
//Modified List: [ 'shree', 45, 'seeta', 30, 'John', 35 ]


let [personName, personAge] = person;
console.log(`${personName} is ${personAge} years old.`); 
// Output: John is 35 years old.  

//function that returns a touple- multiple values from function- structured data- easy to use
function getCoordinates(): [number, number] {
    return [10, 20];
}
let [x, y] = getCoordinates();
console.log(`X: ${x}, Y: ${y}`); 
// Output: X: 10, Y: 20

//touple with optional and rest elements- flexible length- variable number of elements- dynamic data structures
let employee: [string, number, ...string[]];
employee = ["Eve", 28, "Manager", "HR"];
console.log("Employee Tuple:", employee);
// Output: Employee Tuple: [ 'Eve', 28, 'Manager', 'HR' ]

let [empName, empAge, ...roles] = employee;
console.log(`${empName}, Age: ${empAge}, Roles: ${roles.join(", ")}`); 
// Output: Eve, Age: 28, Roles: Manager, HR

//nested touples- touple within a touple- complex data structures- better organization- easier access- improved readability
let product: [string, [number, string]];
product = ["Laptop", [1500, "USD"]];
console.log("Product Tuple:", product); 
// Output: Product Tuple: [ 'Laptop', [ 1500, 'USD' ] ]

let [productName, [price, currency]] = product;
console.log(`Product: ${productName}, Price: ${price} ${currency}`);
// Output: Product: Laptop, Price: 1500 USD

//touple with readonly elements- prevents modification- immutable- safer- better maintainability- avoid accidental changes
let readonlyPoint: readonly [number, number] = [5, 10];
console.log("Readonly Point:", readonlyPoint); 
//try to modify readonly touple will result in error

// Output: Readonly Point: [ 5, 10 ]
//readonlyPoint[0] = 15; // Error: Cannot assign to '0' because it is a read-only property

let [pointX, pointY] = readonlyPoint;
console.log(`Point X: ${pointX}, Point Y: ${pointY}`); 
// Output: Point X: 5, Point Y: 10

//destructuring touple in function parameters- easy access- cleaner code- improved readability- better maintainability
function displayCoordinates([x, y]: [number, number]): void {
    console.log(`Coordinates are X: ${x}, Y: ${y}`);
}
displayCoordinates([30, 40]);
// Output: Coordinates are X: 30, Y: 40

//touple with mixed types- different types- heterogeneous data structures- better organization- improved type safety
let mixedTuple: [string, number, boolean];
mixedTuple = ["Alice", 25, true];
console.log("Mixed Tuple:", mixedTuple); 
// Output: Mixed Tuple: [ 'Alice', 25, true ]   
let [name, age, isActive] = mixedTuple;
console.log(`${name}, Age: ${age}, Active: ${isActive}`); 
// Output: Alice, Age: 25, Active: true 

//function that returns a touple with mixed types- structured data- multiple return values- easy to use
function getUserInfo(): [string, number, boolean] {
    return ["Bob", 30, false];
}   

//destructuring the returned touple
let [userName, userAge, userActive] = getUserInfo();
console.log(`User: ${userName}, Age: ${userAge}, Active: ${userActive}`); 
// Output: User: Bob, Age: 30, Active: false

//touple with default values using destructuring- default values- optional elements- flexible data structures- improved usability
let settings: [string, number?] = ["DarkMode"];
let [theme, fontSize = 14] = settings;
console.log(`Theme: ${theme}, Font Size: ${fontSize}`); 
// Output: Theme: DarkMode, Font Size: 14
settings = ["LightMode", 16];
[theme, fontSize = 14] = settings;
console.log(`Theme: ${theme}, Font Size: ${fontSize}`); 
// Output: Theme: LightMode, Font Size: 16  

//touple with union types
let unionTuple: [string | number, boolean];
unionTuple = [42, true];
console.log("Union Tuple:", unionTuple);
// Output: Union Tuple: [ 42, true ]
let [unionValue, unionFlag] = unionTuple;
console.log(`Value: ${unionValue}, Flag: ${unionFlag}`); 
// Output: Value: 42, Flag: true
unionTuple = ["Answer", false];
[unionValue, unionFlag] = unionTuple;
console.log(`Value: ${unionValue}, Flag: ${unionFlag}`); 
// Output: Value: Answer, Flag: false

//function that returns a touple with union types
function getUnionData(): [string | number, boolean] {
    return ["Data", true];
}
let [dataValue, dataFlag] = getUnionData();
console.log(`Data Value: ${dataValue}, Data Flag: ${dataFlag}`); 
// Output: Data Value: Data, Data Flag: true

//touple with symbol and bigint types
let specialTuple: [symbol, bigint];
specialTuple = [Symbol("id"), BigInt(9007199254741991)];
console.log("Special Tuple:", specialTuple);
// Output: Special Tuple: [ Symbol(id), 9007199254741991n ] 
let [sym, bigIntValue] = specialTuple;
console.log(`Symbol: ${sym.toString()}, BigInt: ${bigIntValue}`); 
// Output: Symbol: Symbol(id), BigInt: 9007199254741991n

//for .. of loop with touple array
let toupleArray: [string, number][] = [
    ["Item1", 10],     
    ["Item2", 20],
    ["Item3", 30]
];
for (let [itemName, itemValue] of toupleArray) {
    console.log(`Item: ${itemName}, Value: ${itemValue}`);
}
// Output:
// Item: Item1, Value: 10
// Item: Item2, Value: 20
// Item: Item3, Value: 30

//map with touple as key-value pairs
let toupleMap: Map<string, number> = new Map();
toupleMap.set("A", 1);
toupleMap.set("B", 2);
toupleMap.set("C", 3);
for (let [key, value] of toupleMap) {
    console.log(`Key: ${key}, Value: ${value}`);
}
// Output:
// Key: A, Value: 1
// Key: B, Value: 2
// Key: C, Value: 3

//touple with function types
let functionTuple: [string, (x: number, y: number) => number];
functionTuple = ["Add", (x, y) => x + y];
console.log("Function Tuple:", functionTuple);
let [funcName, func] = functionTuple;
let result = func(5, 10);
console.log(`${funcName} Result: ${result}`); 
// Output: Add Result: 15   
//function that returns a touple with function types
function getFunctionTuple(): [string, (msg: string) => void] {
    return ["Logger", (msg) => console.log(`Log: ${msg}`)];
}
let [loggerName, loggerFunc] = getFunctionTuple();
loggerFunc("This is a log message."); 
// Output: Log: This is a log message.
console.log(`Function Name: ${loggerName}`);
// Output: Function Name: Logger    
//touple with date type
let dateTuple: [string, Date];
dateTuple = ["Event", new Date("2024-01-01")];
console.log("Date Tuple:", dateTuple);
let [eventName, eventDate] = dateTuple;
console.log(`Event: ${eventName}, Date: ${eventDate.toDateString()}`); 
// Output: Event: Event, Date: Mon Jan 01 2024  
//function that returns a touple with date type
function getDateTuple(): [string, Date] {
    return ["Meeting", new Date("2024-06-15")];
}   
let [meetingName, meetingDate] = getDateTuple();
console.log(`Meeting: ${meetingName}, Date: ${meetingDate.toDateString()}`); 
// Output: Meeting: Meeting, Date: Sat Jun 15 2024  

//array of touples
let toupleList: [string, number][] = [
    ["Alpha", 1],   
    ["Beta", 2],
    ["Gamma", 3]
];
for (let [label, number] of toupleList) {
    console.log(`Label: ${label}, Number: ${number}`);

}
// Output:
// Label: Alpha, Number: 1
// Label: Beta, Number: 2
// Label: Gamma, Number: 3  

//function that returns an array of touples
function getToupleList(): [string, number][] {
    return [    
        ["Delta", 4],
        ["Epsilon", 5],
        ["Zeta", 6]
    ];
}
let touples = getToupleList();
for (let [label, number] of touples) {
    console.log(`Label: ${label}, Number: ${number}`);
}   

// Output:
// Label: Delta, Number: 4
// Label: Epsilon, Number: 5
// Label: Zeta, Number: 6

//destructuring with default values in touple array
let configList: [string, number?][] = [
    ["ConfigA", 10],    
    ["ConfigB"],
    ["ConfigC", 30]
];
for (let [configName, configValue = 20] of configList) {
    console.log(`Config: ${configName}, Value: ${configValue}`);
}       
// Output:
// Config: ConfigA, Value: 10
// Config: ConfigB, Value: 20
// Config: ConfigC, Value: 30

//extract array of touples from a map
let settingsMap: Map<string, number> = new Map();
settingsMap.set("Setting1", 100);
settingsMap.set("Setting2", 200);
settingsMap.set("Setting3", 300);
let settingsArray: [string, number][] = Array.from(settingsMap);
for (let [settingName, settingValue] of settingsArray) {
    console.log(`Setting: ${settingName}, Value: ${settingValue}`);
}   
// Output:
// Setting: Setting1, Value: 100
// Setting: Setting2, Value: 200
// Setting: Setting3, Value: 300    

//function that converts from map to an array of touples
function mapToToupleArray(map: Map<string, number>): [string, number][] {
    return Array.from(map);
}   
let convertedArray = mapToToupleArray(settingsMap);
for (let [settingName, settingValue] of convertedArray) {
    console.log(`Setting: ${settingName}, Value: ${settingValue}`);
}
// Output:
// Setting: Setting1, Value: 100
// Setting: Setting2, Value: 200
// Setting: Setting3, Value: 300    

export {};