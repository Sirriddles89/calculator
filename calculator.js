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
    current.innerHTML += input;
    tmp += input;
    progress.innerHTML += tmp;
    if (buttonType === "digit" && equalsPressed) {
        current.innerHTML = input;
        progress.innerHTML = input;
    } else if (buttonType === "backspace") {
        current.innerHTML = current.innerHTML.slice(0, -1)
        tmp = tmp.slice(0, -1);
        progress.innerHTML = progress.innerHTML.slice(0, -1);
    } else if (buttonType === "operator" && operatorPressed === true) {
        current.innerHTML = input;
    } else if (buttonType === "equals") {
        if (!operand.secondNumber) {
            current.innerHTML = input;
            progress.innerHTML = input;
        }
        
    } else if (buttonType === "percentage") {
        current.innerHTML = input;
        current.innerHTML = current.innerHTML.slice(0, 1);
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
    } else if (equalsPressed) {
        operand.firstNumber = buttonValue;
        equalsPressed = false;
    } else {
      operand.firstNumber = (operand.firstNumber || '') + buttonValue;
    }
}
function decimalPoint(operatorPressed, operand, buttonValue) {
    if (operatorPressed === false) {
        operand.firstNumber += buttonValue;
    } else {
        operand.secondNumber += buttonValue;
    }
}
function operatorCase(operand, buttonValue, buttonType) {
    if (!operand.operator) {
        operand.operator = buttonValue;
    } else {
        operand.firstNumber = operate(operand);
        operand.secondNumber = "";
        operand.operator = buttonValue;
        updateDisplay(`${operand.firstNumber}${buttonValue}`, buttonType);
    }
}
function equalsCase(operand, buttonType) {
    let solution = operate(operand);
    operand.firstNumber = solution;
    operand.operator = "";
    operand.secondNumber = "";
    updateDisplay(solution, buttonType);
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
    let float;
    if (operand.secondNumber) {
        float = percentage(operand.secondNumber);
        operand.secondNumber = float;
        updateDisplay(`${operand.firstNumber}${operand.operator}${operand.secondNumber}`);
    } else {
        float = percentage(operand.firstNumber);
        operand.firstNumber = float;
        if (operand.operator) {
            updateDisplay(`${float}${operand.operator}`);
        } else {
            updateDisplay(float);
        }
    }
}
function updateString(numString, buttonValue, buttonType) {
    if (buttonType === "operator" && operatorPressed) {
        numString += "="
    } else if (buttonType === "backspace") {
        numString = "";
    } else if (buttonType === "percentage") {
        numString = " % = ";
    } else if (buttonType === "equals" && !operand.secondNumber) {
        numString = `${operand.firstNumber}${operand.operator}`; // this code keeps the display from going blank if/when the user presses "=" with only 1 number entered. Unfortunately it erases the progress bar so I wonder if there's a better way.
    } else if (buttonType === "operator" && !operand.firstNumber) {
        numString = "";
    } else {
        numString = numString ? numString + buttonValue : buttonValue;
    }
    return numString;    
}

const operand = {};
let operatorPressed = false;
let equalsPressed = false;
let numString = "";
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonType = e.target.className;
        let buttonValue = e.target.innerText;
        numString = updateString(numString, buttonValue, buttonType);
        updateDisplay(numString, buttonType);
        switch (buttonType) {
            case "digit":
                digitCase(operatorPressed, operand, buttonValue);
                break;
            case "decimalPoint":
                decimalPoint(operatorPressed, operand, buttonValue);
                break;
            case "operator":
                if (!operand.firstNumber) {
                    break;
                }
                operatorCase(operand, buttonValue, buttonType);
                operatorPressed = true;
                break;
            case "equals":
                if (!operand.secondNumber) {
                    break;
                }
                equalsCase(operand, buttonType);
                operatorPressed = false;
                equalsPressed = true;
                break;
            case "backspace":
                operatorPressed = backspace(operand, operatorPressed);
                break;
            case "allClear":
                clearObj(operand);
                operatorPressed = false;
                break;
            case "percentage":
                percentCase(operand);
                break;
        }
        numString = ""; //clear the string after each button press ("numString" is only ever a single character)
        console.log(operand);
        console.log(numString);
        console.log("OperatorPressed = ", operatorPressed); 
        console.log("EqualsPressed = ", equalsPressed);    
           
    })
    
})





