/*  console.log("hello")
 kjkj  */

var age:number = 90;
var age:number = 99;


var num1=0;
let num2=1;

num1=67;
num2=67;
gh=45;

const num3=0;
//named  function
function func(num:number, num1?:number):void {
    if(num1 != undefined)
        console.log(num1)
    if(num===num1)
        console.log("strict equality")
}
func(23,1);
console.log(`gh ${gh}`)

//annonymous function,that does not have a name, usually assigned to a variable
let addNum = function(num:number, num1:number):number {
    if(num1 != undefined)
        console.log(num1)
    if(num===num1)
        console.log("strict equality")
    return num+num1;
}

console.log("add",addNum(23,1));

//arrow function with single parameter
let multiplyNum = (num:number) => num*num;

console.log("multiply", multiplyNum(4));

//named function with default parameter usually at the end
function calculate(num:number, num1:number=10):number {
    return num+num1;
}
console.log("calculate",calculate(5));

//named function with rest parameter function usually at the end, same type        
function sum(...nums:number[]):number {
    let total=0;            
    for(let n of nums) {
        total+=n;
    }
    return total;
}   
console.log(sum(1,2,3,4,5,6,7,8,9,10));
console.log(sum(1,2,3));
console.log(sum(1,2,3,4,5));

//named function with rest parameter with mutliple types
function findElements(...elements:(number | string)[]):number {
    return elements.length;
}
findElements(1,2,3,"g","b");

//named function with union type parameters
function display(value:number | string):void {
    console.log(`value is ${value}`);
}   
display(23);
display("hello");
//display(45,"66");

//named function with Optional parameters
function displayDetails(id:number, name:string, mailId?:string): void
{
    console.log("ID:",id);
    console.log("Name:",name);
    if(mailId !==undefined )
    {
    console.log("Email:", mailId);
    }
}

displayDetails(123,"Scott","scot@gmail.com");
displayDetails(123,"Scott");

//function with generic type
function displayGeneric<T>(value:T):void {
    console.log(`value is ${value}`);
}       
displayGeneric<number>(45);
displayGeneric<string>("hello");


//function overloading

