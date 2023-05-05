function add(x, y) {
    let sum = parseFloat(x) + parseFloat(y);
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

function percentage(x) {
    return x = x / 100;
}

function operate(operand) {
    let result = 0;
    let x = parseFloat(operand.firstNumber);
    let y = parseFloat(operand.secondNumber);
    switch(operand.operator) {
        case "+":
            result =  add(x, y);
           break;
        case "-":
            result = subtract(x, y); 
            break;
        case "\u00D7":
            result = multiply(x, y);
            break;
        case "\u00F7":
            result = divide(x, y);
            break;
    }
    return result;
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
    else if (buttonType === "percentage" || buttonType === "falseEquals") {
        progress.innerHTML = "";
    }
    else if (buttonType === "clearOperator") {
        progress.innerHTML = input;
    }
}

function clearObj(operand) {
    for (let prop in operand) {
        delete operand[prop];
    }
}

function digitCase(operatorPressed, operand, buttonValue) {
    if (operatorPressed) {
      operand.secondNumber = (operand.secondNumber || '') + buttonValue;
    } else {
      operand.firstNumber = (operand.firstNumber || '') + buttonValue;
    }
  }

function decimalPoint(operatorPressed, operand, buttonValue) {
    if (operatorPressed === false) {
        operand.firstNumber += buttonValue;
    }
    else {
        operand.secondNumber += buttonValue;
    }
}

const operand = {};
let operatorPressed = false;
let numString = "";
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonType = e.target.className;
        let buttonValue = e.target.innerText;
        numString = numString ? numString + buttonValue : buttonValue;
        updateDisplay(numString, buttonType);
        switch (buttonType) {
            case "digit":
                digitCase(operatorPressed, operand, buttonValue);
                break;
            case "decimalPoint":
                decimalPoint(operatorPressed, operand, buttonValue);
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
                    updateDisplay(operand.firstNumber, buttonType);
                    numString = "";
                }
                break;
            case "equals":
                if (!operand.firstNumber && !operand.secondNumber) {
                    numString = "";
                    updateDisplay("", "falseEquals")
                    break;
                }
                else if (operand.firstNumber && !operand.secondNumber) {
                    updateDisplay(operand.firstNumber, "falseEquals");
                    numString = numString.slice(0, -1);
                    break;
                }
                let solution = operate(operand);
                updateDisplay(solution, buttonType);
                numString = "";
                break;
            case "backspace":
                if (operatorPressed === false && operand.firstNumber) {
                    operand.firstNumber = operand.firstNumber.slice(0, -1);
                    numString = numString.slice(0, -2);
                    updateDisplay(operand.firstNumber, buttonType);
                    break;
                }
                else if (operand.firstNumber && operand.operator && !operand.secondNumber) {
                    operand.operator = "";
                    numString = numString.slice(0, -2);
                    updateDisplay(operand.firstNumber, "clearOperator");
                    operatorPressed = false;
                    break;
                }
                else {
                    operand.secondNumber = operand.secondNumber.slice(0, -1);
                    numString = numString.slice(0, -2);
                    updateDisplay(operand.secondNumber, buttonType);
                    break;
                }    
            case "allClear":
                clearObj(operand);
                numString = "";
                buttonType = "";
                operatorPressed = false;
                break;
            case "percentage":
                numString = numString.slice(0, -1);
                let percent;
                if (!operatorPressed) {
                    percent = percentage(operand.firstNumber);
                    operand.firstNumber = percent.toString();
                    numString = "";
                    numString += percent;
                } 
                else {
                    num = operate(operand);
                    percent = percentage(num);
                    operand.firstNumber = percent.toString();
                    operand.secondNumber = "";
                    operand.operator = "";
                    numString = "";
                    numString += percent;
                }   

                updateDisplay(percent, buttonType);
                break;
        }
        
        console.log(operand);
        console.log(numString);
        
        
    
    })
})





