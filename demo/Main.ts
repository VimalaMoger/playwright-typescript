import { add, subtract, appName, Formatter } from './Module';


console.log(appName);
add(5, 3);
subtract(10, 4);

console.log(add(5, 3));
console.log(subtract(10, 4));

const formattedAdd = Formatter.formatResult(add(5, 3));
const formattedSubtract = Formatter.formatResult(subtract(10, 4));  