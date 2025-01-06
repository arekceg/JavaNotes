type Operator = (num1: number, num2: number) => number;

function add(num1: number, num2: number): number {
    return num1 + num2;
}

function multiply(num1: number, num2: number): number {
    return num1 * num2;
}

function subtract(num1: number, num2: number): number {
    return num1 - num2;
}

function calculate(num1: number, num2: number, operator: Operator): number {
    return operator(num1, num2);
}
