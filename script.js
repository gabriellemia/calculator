const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');

const equalsButton = document.querySelector('.equals');
    equalsButton.addEventListener('click', () => {
        if(currentNum != "" && previousNum != "") {
            calculate();
        }
    });

const clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', chooseClear);

const deleteButton = document.querySelector('.delete');
    deleteButton.addEventListener('click', chooseDelete);

const previousDisplay = document.querySelector('.previous-input');
const currentDisplay = document.querySelector('.current-input');

const decimal = document.querySelector('.decimal');
    decimal.addEventListener('click', decimalPlace);

const calculator = document.querySelector('.calculator');

let currentNum = "";
let previousNum = "";
let operator = "";



numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        chooseNumber(e.target.textContent);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        chooseOperation(e.target.textContent);
    });
});

function chooseOperation(operation) {
    if (previousNum === "") {
        previousNum = currentNum;
        extendCalc(operation); 
    } else if (currentNum === "") {
        extendCalc(operation);
    } else {
        calculate();
        operator = operation;
        currentDisplay.textContent = "0";
        previousDisplay.textContent = previousNum + " " + operator;
    }
}

function extendCalc (text) {
    operator = text;
    previousDisplay.textContent = previousNum + " " + operator;
    currentDisplay.textContent = "0";
    currentNum = "";
}

function chooseNumber(number) {
    if (previousNum != "" && currentNum !== "" && operator === "") {
        previousNum = "";
        currentDisplay .textContent = currentNum;
    }
    if (currentNum.length <= 15) {
    currentNum += number;
    currentDisplay.textContent = currentNum;
    }
}

function chooseClear() {
    currentNum = "";
    previousNum = "";
    operator = "";
    currentDisplay.textContent = "";
    previousDisplay.textContent = "";
}

function chooseDelete() {
    currentNum = currentNum.toString().slice(0, -1);
    currentDisplay.textContent = currentNum;
}

function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if (operator === "+") {
        previousNum += currentNum;
    } else if (operator === "-") {
        previousNum -= currentNum;
    } else if (operator === "*") {
        previousNum *= currentNum;
    } else if (operator === "/") {
        if (currentNum <= 0) {
            previousNum = "Cannot divide by 0 😖";
            previousDisplay.textContent = "";
            currentDisplay.textContent = previousNum;
            operator = "";
            return;
        }
        previousNum /= currentNum;
    }
    previousNum = rounding(previousNum);
    previousNum = previousNum.toString();
    setDisplay();
}

function rounding (num) {
    return Math.round(num * 100000) / 100000
}

function setDisplay() {
    if (previousNum.length <= 15) {
        currentDisplay.textContent = previousNum;
    } else {
        currentDisplay.textContent = previousNum.slice(0, 15) + "...";
    }
    previousDisplay.textContent = "";
    operator = "";
    currentNum = "";
}

function decimalPlace () {
    if (!currentNum.includes (".")) {
        currentNum += ".";
        currentDisplay.textContent = currentNum;
    }
}

