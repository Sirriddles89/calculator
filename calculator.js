function add(x, y) {
    let sum = x + y;
    return sum;
}

function subtract(x, y) {
    let difference = x - y;
    return difference;
}

function multiply(x, y) {
    let product = x * y;
    return product;
}

function divide(x, y) {
    let quotient = x / y;
    return quotient;

}

function operate(operand) {
    let curValue = 0;
    let x = parseInt(operand.firstNumber);
    let y = parseInt(operand.secondNumber);
    switch(operand.operator) {
        case "+":
           curValue =  add(x, y);
           break;
        case "-":
            curValue = subtract(x, y); 
            break;
        case "\u00D7":
            curValue = multiply(x, y);
            break;
        case "\u00F7":
            curValue = divide(x, y);
            break;
    }
    return curValue;
}

function updateDisplay(input, buttonType) {
    let current = document.querySelector('.currentDigit');
    let progress = document.querySelector('.top');
    current.innerHTML = input;
    if (buttonType === "operator" || buttonType === "equals") {
        progress.innerHTML += input;
    }
    else if (buttonType === "allClear") {
        progress.innerHTML = "";
        current.innerHTML = "";
    }
}

function clearObj(operand) {
    for (let prop in operand) {
        delete operand[prop];
    }
}

const operand = {};
let operatorPressed = false;
let numString = "";
console.log(numString);
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonType = e.target.className;
        let buttonValue = e.target.innerText;
        numString = numString ? numString + buttonValue : buttonValue;
        updateDisplay(numString, buttonType);
        switch (buttonType) {
            case "digit":
                if (operatorPressed === false) {
                    operand.firstNumber = operand.firstNumber ? operand.firstNumber + buttonValue :  buttonValue;
                }
                else {
                    operand.secondNumber = operand.secondNumber ? operand.secondNumber + buttonValue : buttonValue;
                }
                break; 
            case "operator":
                if (!operand.operator) {
                    operand.operator = buttonValue;
                    operatorPressed = true;
                    numString = "";
                }
                else {
                    operand.firstNumber = operate(operand);
                    operand.secondNumber = "";
                    operand.operator = buttonValue;
                    updateDisplay(operand.firstNumber);
                    numString = "";
                }
                break;
            case "equals":
                let solution = operate(operand);
                updateDisplay(solution, buttonType);
                numString = "";
                break;
            case "allClear":
                clearObj(operand);
                numString = "";
                buttonType = "";
                operatorPressed = false;
                break;
        }
        console.log(operand);
        
        
    
    })
})





