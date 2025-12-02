//Strings example
let greeting: string = "Hello, World!";
console.log(greeting);

let newName: string = "Alice";
let personalizedGreeting: string = `${greeting} My name is ${newName}.`;
console.log(personalizedGreeting);

let multilineString: string = `This is a string
that spans multiple lines.
***************`;
console.log(multilineString);

let upperCaseGreeting: string = greeting.toUpperCase();
console.log(upperCaseGreeting);

let stringLength: number = greeting.length;
console.log(`The length of the greeting is: ${stringLength}`);

let replacedString: string = greeting.replace("World", "TypeScript");
console.log(replacedString);

let substring: string = greeting.substring(5, 10);
console.log(`Extracted substring: ${substring}`);
//output: , Wor

let splitString: string[] = greeting.split(", ");
console.log(`Split string: ${splitString}`);

let trimmedString: string = "   Hello, Trimmed World!   ".trim();
console.log(`'${trimmedString}'`);

let charAtIndex: string = greeting.charAt(1);
console.log(`Character at index 1: ${charAtIndex}`);
let includesSubstring: boolean = greeting.includes("");
console.log(`Does the greeting include ''? ${includesSubstring}`);

let indexOfSubstring: number = greeting.indexOf("World");
console.log(`Index of 'World': ${indexOfSubstring}`);

let repeatedString: string = "Ha".repeat(3);
console.log(repeatedString);

let startsWithHello: boolean = greeting.startsWith("Hello");
console.log(`Does the greeting start with 'Hello'? ${startsWithHello}`);

let endsWithExclamation: boolean = greeting.endsWith("!");
console.log(`Does the greeting end with '!'? ${endsWithExclamation}`);

let lowerCaseGreeting: string = greeting.toLowerCase();
console.log(lowerCaseGreeting);

//----------------------------- Additional String Methods ----------------------------
//charCodeAt returns the Unicode of the character at a specified index in a string
let charCodeAtIndex: number = greeting.charCodeAt(0);
console.log(`Character code at index 0: ${charCodeAtIndex}`);

let concatenatedString: string = greeting.concat(" Welcome to TypeScript.");
console.log(concatenatedString);

let searchIndex: number = greeting.search("World");
console.log(`Search index of 'World': ${searchIndex}`);

let padStartString: string = greeting.padStart(20, "*");
console.log(padStartString);

let padEndString: string = greeting.padEnd(20, "*");
console.log(padEndString);

let localeString: string = greeting.toLocaleUpperCase();
console.log(localeString);

let localeLowerCaseString: string = greeting.toLocaleLowerCase();
console.log(localeLowerCaseString);

let valueOfString: string = greeting.valueOf();
console.log(valueOfString);

let matchArray: RegExpMatchArray | null = greeting.match(/World/);
console.log(`Match array for 'World': ${matchArray}`);

let localeCompareResult: number = greeting.localeCompare("Hello, TypeScript!");
console.log(`Locale compare result with 'Hello, TypeScript!': ${localeCompareResult}`);

let fromCharCodeString: string = String.fromCharCode(72, 101, 108, 108, 111);
console.log(`String from char codes: ${fromCharCodeString}`);

let fromCodePointString: string = String.fromCodePoint(128512, 128513, 128514);
console.log(`String from code points: ${fromCodePointString}`);

// End of Strings example
