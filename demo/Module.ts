
export let appName = "Calculator";

export function add(a: number, b: number): number {
    return a + b;
}
export function subtract(a: number, b: number): number {
    return a - b;
}

export class Formatter {
    static formatResult(result: number): string {
        return `Result: ${result}`;
    }
}