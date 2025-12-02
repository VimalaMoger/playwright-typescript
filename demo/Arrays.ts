let names: string[] = ["Alice", "Bob", "Charlie"]; ///declaration and initialization of an array

names.push("Diana");

for (let name of names) {
    console.log(name);
}   
// Output:
// Alice
// Bob
// Charlie
// Diana    

console.log("Total names:", names.length); // Output: Total names: 4
console.log("Total names:", names.length); // Output: Total names: 4

names.splice(1, 1); // Remove "Bob"
console.log("After removal:", names); // Output: After removal: After removal: [ 'Alice', 'Charlie', 'Diana' ]
   
for (let name of names) {
    console.log(name);
}
// Alice
// Charlie
// Diana

let namesUpperCase: string[] = names.map(name => name.toUpperCase());
console.log("Uppercase names:", namesUpperCase); // Output: Uppercase names: [ 'ALICE', 'CHARLIE', 'DIANA' ]    

let namesList:string[] = [];  //declaration of an empty array
namesList.push(...names);
console.log("Names list:", namesList); // Output: Names list: [ 'Alice', 'Charlie', 'Diana' ]
console.log("Names list:", namesList); // Output: Names list: [ 'Alice', 'Charlie', 'Diana' ]

let namesString: string = names.join(", ");
console.log("Names as string:", namesString); // Output: Names as string: Alice, Charlie, Diana 
console.log("Names as string:", namesString); // Output: Names as string: Alice, Charlie, Diana 

//Aproach using the generic Array<T> type
let numbers: Array<number> = [1, 2, 3, 4, 5]; //declaration and initialization of an array using generic type
numbers.push(6);
console.log("Numbers:", numbers);
// Output: Numbers: [ 1, 2, 3, 4, 5, 6 ]

//mixed type array using union types
let mixedArray: (string | number)[] = ["Alice", 30, "Bob", 25];
mixedArray.push("Charlie");
mixedArray.push(28);
console.log("Mixed Array:", mixedArray);
// Output: Mixed Array: [ 'Alice', 30, 'Bob', 25, 'Charlie', 28 ]   

for (let item of mixedArray) {
    console.log("Item:", item);
}
 
//mixed array types using 'any'
let anyArray: any[] = ["Alice", 30, true, { city: "New York" }];
anyArray.push([1, 2, 3]);
console.log("Any Array:", anyArray);
// Output: Any Array: [ 'Alice', 30, true, { city: 'New York' }, [ 1, 2, 3 ] ]  

//tuple type array
let tupleArray: [string, number][] = [["Alice", 30], ["Bob", 25]];
tupleArray.push(["Charlie", 28]);
console.log("Tuple Array:", tupleArray);
// Output: Tuple Array: [ [ 'Alice', 30 ], [ 'Bob', 25 ], [ 'Charlie', 28 ] ]   
for (let [name, age] of tupleArray) {
    console.log(`${name} is ${age} years old.`);
}
// Alice is 30 years old.
// Bob is 25 years old.
// Charlie is 28 years old.

// multidimensional array
let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("Matrix:"); 
for (let row of matrix) {
    console.log(row);
}
// Output:
// Matrix:
// [ 1, 2, 3 ]
// [ 4, 5, 6 ]
// [ 7, 8, 9 ]

//using loop with of
for(let val of matrix){
    console.log("Row values:", val);
}
// Output:
// Row values: [ 1, 2, 3 ]
// Row values: [ 4, 5, 6 ]
// Row values: [ 7, 8, 9 ]

//search element in a Array
let searchName: string = "Charlie";
let foundIndex: number = names.indexOf(searchName);
if (foundIndex !== -1) { // -1 means not found
    console.log(`${searchName} found at index ${foundIndex}.`);
} else {
    console.log(`${searchName} not found in the array.`);
}       
// Output: Charlie found at index 2.

//function takes an array and returns an array
function reverseArray(arr: string[]): string[] {
    let result:string[] = [];
    for(let i=0;i<arr.length;i++){
        result[i] = arr[arr.length - 1 - i];
    }   
    return result;
}   
let reversedNames: string[] = reverseArray(names);
console.log("Reversed Names:", reversedNames); 
// Output: Reversed Names: [ 'Diana', 'Charlie', 'Alice' ]  

//concatenate two arrays
let moreNames: string[] = ["Eve", "Frank"];
let allNames: string[] = names.concat(moreNames);
console.log("All Names:", allNames); 
// Output: All Names: [ 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank' ]

//filter array
let filteredNames: string[] = allNames.filter(name => name.startsWith("C"));
console.log("Filtered Names (start with C):", filteredNames); 
// Output: Filtered Names (start with C): [ 'Charlie' ]

//slice array- extracts a portion of an array- does not modify the original array
//allNames: [ 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank']
let slicedNames: string[] = allNames.slice(1, 4);
console.log("Sliced Names (index 1 to 3):", slicedNames); 
// Output: Sliced Names (index 1 to 3): [ 'Charlie', 'Diana', 'Eve' ]

//splice array- modifies the original array- removes or adds elements- 
let splicedNames: string[] = allNames.splice(2, 2, "Grace", "Hank");
console.log("Spliced Names (removed):", splicedNames);  
// Output: Spliced Names (removed): [ 'Diana', 'Eve' ]
console.log("All Names after splice:", allNames);
// Output: All Names after splice: [ 'Alice', 'Charlie', 'Grace', 'Hank', 'Frank' ]

//array.splice(start, deleteCount, item1, item2, ...)
//array.slice(start, end)

//splice() to remove and add elements
//allNames: [ 'Alice', 'Charlie', 'Grace', 'Hank', 'Frank']
allNames.splice(3, 1, "Ivy", "Jack"); //at index 3, delete 1 item, add "Ivy" and "Jack"
console.log("All Names after adding Ivy and Jack:", allNames);
// Output: All Names after adding Ivy and Jack: [ 'Alice', 'Charlie', 'Grace', 'Ivy', 'Jack', 'Frank' ]

//final output of allNames array- 
console.log("Final All Names array:", allNames);
// Output: Final All Names array: [ 'Alice', 'Charlie', 'Grace', 'Ivy', 'Jack', 'Frank' ]

allNames.splice(0, 0, "Shan", "Grant"); //add elements at the start of the array
console.log("All Names after adding Shan and Grant at start:", allNames);
// Output: after adding Shan and Grant at start: [ 'Shan', 'Grant', 'Alice', 'Charlie', 'Grace', 'Ivy', 'Jack', 'Frank' ]
//allNames.splice(0, allNames.length); //clear the array
//console.log("All Names after clearing:", allNames); // Output: All Names after clearing: []

//indexOf()
let indexOfIvy: number = allNames.indexOf("Ivy");
console.log("Index of Ivy:", indexOfIvy); // Output: Index of Ivy: 5    

//indexOf() with start index- starts searching from index 2
let indexOfA: number = allNames.indexOf("A", 2);    
console.log("Index of A starting from index 2:", indexOfA); // Output: Index of A starting from index 2: -1
//-1 means not found

//lastIndexOf()
allNames.push("Alice"); //adding duplicate to demonstrate lastIndexOf
let lastIndexOfAlice: number = allNames.lastIndexOf("Alice");
console.log("Last Index of Alice:", lastIndexOfAlice); // Output: Last Index of Alice: 2

//lastIndexOf() with start index
let lastIndexOfA: number = allNames.lastIndexOf("A", 5);
console.log("Last Index of A starting from index 5:", lastIndexOfA); // Output: Last Index of A starting from index 5: -1
//-1 means not found    

//includes()
let hasFrank: boolean = allNames.includes("Frank");
console.log("Does allNames include Frank?", hasFrank); // Output: Does allNames include Frank? true 
let hasZoe: boolean = allNames.includes("Zoe");
console.log("Does allNames include Zoe?", hasZoe); // Output: Does allNames include Zoe? false
//find()
let foundName: string | undefined = allNames.find(name => name.startsWith("G"));
console.log("First name starting with G:", foundName); // Output: First name starting with G: Grace
//findIndex()
let foundIndexG: number = allNames.findIndex(name => name.startsWith("G"));
console.log("Index of first name starting with G:", foundIndexG); // Output: Index of first name starting with G: 4
//forEach()
console.log("All Names using forEach:");
allNames.forEach(name => console.log(name));

//foreach, map(), filter(), reduce() are commonly used higher-order functions for array manipulation in TypeScript.
allNames.forEach(function(currentValue, index, arra){});    
names.forEach(function(currentValue, index, array) {
    console.log(`Index ${index}: ${currentValue}`);
});

for(let i in allNames){
    console.log(`Index ${i}: ${allNames[i]}`);
}

allNames.forEach(element => {
    console.log(element);        
});

allNames.forEach(function(element, index, array) {
    array[index] = element.toUpperCase();
    console.log(`Index ${index}: ${element}`);
});

//using arrow/lambda function
allNames.forEach((element, index) => {
    console.log(`Index ${index}: ${element}`);
});

//map()- creates a new array by applying a function to each element of the original array
let nameLengths: number[] = allNames.map(name => name.length);

let nums: number[] = [1, 2, 3, 4, 5];
let squaredNumbers: number[] = nums.map(num => num * num);
console.log("Squared Numbers:", squaredNumbers); // Output: Squared Numbers: [ 1, 4, 9, 16, 25 ]    

//filter()- creates a new array with elements that pass a test
let numGreaterThan3: number[] = nums.filter(num => num > 3);
console.log("Long Numbers (greater than 3):", numGreaterThan3); // Output: Long Numbers (greater than 3): [ 4, 5 ]    

//reduce()- reduces the array to a single value by applying a function
let sumOfNumbers: number = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Sum of Numbers:", sumOfNumbers); // Output: Sum of Numbers: 15
  
//some(), every() - like reduce, returns a single boolean value based on the test condition
//some()- checks if at least one element passes the test
let hasLongName: boolean = allNames.some(name => name.length > 5);
console.log("Does allNames have any name longer than 5 characters?", hasLongName); // Output: true

//every()- checks if all elements pass the test
let allNamesShorterThan10: boolean = allNames.every(name => name.length < 10);
console.log("Are all names in allNames shorter than 10 characters?", allNamesShorterThan10); // Output: true    


