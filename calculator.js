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
    let tmp = "";
    if (buttonType === "backspace") {
        input = "";
        current.innerHTML = current.innerHTML.slice(0, -1)
        tmp = tmp.slice(0, -1);
        progress.innerHTML = progress.innerHTML.slice(0, -1);
    } 
    current.innerHTML += input;
    tmp += input;
    progress.innerHTML += tmp;
    if (buttonType === "operator") {
        current.innerHTML = "";
    } else if (buttonType === "equals" || buttonType === "percentage") {
        current.innerHTML = input;
    } else if(buttonType === "allClear") {
        current.innerHTML = "";
        progress.innerHTML = "";
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
function operatorCase(operand, buttonValue) {
    if (!operand.operator) {
        operand.operator = buttonValue;
    } else {
        operand.firstNumber = operate(operand);
        operand.secondNumber = "";
        operand.operator = buttonValue;
        updateDisplay(`${operand.firstNumber}${buttonValue}`);
    }

}
function equalsCase(operand, buttonType) {
    let solution = operate(operand);
    updateDisplay(solution, buttonType);
}
function updateString(numString, buttonValue) {
    numString = numString ? numString + buttonValue : buttonValue;
    return numString;
}
function clearString(numString) {
    numString = "";
    return numString;
}
function backspace(operand, operatorPressed) {
    if (operatorPressed && operand.secondNumber) {
        operand.secondNumber = operand.secondNumber.slice(0, -1);
    } else if (operatorPressed && !operand.secondNumber) {
        operand.operator = "";
        operatorPressed = false;
    } else {
        operand.firstNumber = operand.firstNumber.slice(0, -1);
    }
    return operatorPressed;
    
}
function percentCase(operand) {
    if (operand.secondNumber) {
        operand.secondNumber = percentage(operand.secondNumber);
        return operand.secondNumber;
    } else {
        operand.firstNumber = percentage(operand.firstNumber);
        return operand.firstNumber;
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
        numString = updateString(numString, buttonValue);
        updateDisplay(numString, buttonType);
        switch (buttonType) {
            case "digit":
                digitCase(operatorPressed, operand, buttonValue);
                break;
            case "decimalPoint":
                decimalPoint(operatorPressed, operand, buttonValue);
                break;
            case "operator":
                operatorCase(operand, buttonValue);
                operatorPressed = true;
                break;
            case "equals":
                equalsCase(operand, buttonType);
                break;
            case "backspace":
                operatorPressed = backspace(operand, operatorPressed);
                break;
            case "allClear":
                clearObj(operand);
                operatorPressed = false;
                break;
            case "percentage":
                let float = percentCase(operand);
                updateDisplay(float, buttonType);
                break;
        }
        numString = clearString(numString);
        
        console.log(operand);
        console.log(numString);
        console.log(operatorPressed);     
           
    })
    
})






