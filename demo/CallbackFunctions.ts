
//callback function
function show(message:string):void {
    console.log("Message:",message);
}

//using the callback function in a function
greet("Alice", show);

//function implementation - that takes a callback function as parameter
function greet(name:string, show:(msg:string)=>void):void {
    let msg = `Hello, ${name}!`;
    show(msg);
}   

//callback function example
function processNumbers(nums:number[], callback:(num:number)=>number):number[] {
    let result:number[] = [];
    for(let n of nums) {
        result.push(callback(n));
    }
    return result;
}
let numbers = [1,2,3,4,5];
let doubled = processNumbers(numbers, (num) => num * 2);
console.log("Doubled numbers:", doubled);

let squared = processNumbers(numbers, function(num) { return num * num; });
console.log("Squared numbers:", squared);                   

//function as parameter example
function performOperation(num1:number, num2:number, operation:(a:number, b:number)=>number):number {
    return operation(num1, num2);
}   

let sumResult = performOperation(5, 10, (a, b) => a + b);
console.log("Sum Result:", sumResult);

let multiplyResult = performOperation(5, 10, function(a, b) { return a * b; });
console.log("Multiply Result:", multiplyResult);

//function returning function example
function getMultiplier(factor:number):(num:number)=>number {
    return function(num:number):number {
        return num * factor;
    };
}

let doubleFunc = getMultiplier(2);

console.log("Double 5:", doubleFunc(5));

let tripleFunc = getMultiplier(3);
console.log("Triple 5:", tripleFunc(5));

//closure example
function createCounter():()=>number {
    let count = 0;
    return function():number {
        count++;
        return count;
    };
}

let counter = createCounter();
console.log("Counter:", counter());
console.log("Counter:", counter());
console.log("Counter:", counter()); 
console.log("Counter:", counter());
console.log("Counter:", counter()); 

//function overloading- function signatures
function add(a:number, b:number):number;
function add(a:number, b:string):string;
function add(a:string, b:number):string;
function add(a:string, b:string):string;

//There should be one function implementation which match all the signatures
function add(a: number | string, b: number | string): number | string {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    return `${a}${b}`;
}
console.log("Add Numbers:", add(5, 10));

//different number of parameters
function multiply(a:number, b:number):number;
function multiply(a:number, b:number, c:number):number;

function multiply(a:number, b:number, c?:number):number {   
    if(c !== undefined) {
        return a * b * c;
    }
    return a * b;
}
console.log("Multiply two numbers:", multiply(2, 3));
console.log("Multiply three numbers:", multiply(2, 3, 4));


//with different return types
function format(value:number):string;
function format(value:string):number;  
//function implementation
function format(value:number | string):number | string {
    if(typeof value === 'number') { 
        return value.toFixed(2);
    } else {    
        return parseFloat(value);
    }   
}           
console.log("Format number to string:", format(12.34567));
console.log("Format string to number:", format("45.67"));   



