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

function insertCommas(str) {
    let result = "";
    for (let i = str.length - 1, count = 0; i >= 0; i--, count++) {
      result = str[i] + result;
      if (count > 0 && count % 3 === 0 && i !== 0) {
        result = "," + result;
      }
    }
    return result;
  }

function updateDisplay(input, buttonType) {
    let current = document.querySelector('.currentDigit');
    let progress = document.querySelector('.top');
    current.innerHTML += input;
    progress.innerHTML += input;
    if (buttonType === "digit" && equalsPressed) {
        current.innerHTML = input;
        progress.innerHTML = input;
    } else if (buttonType === "backspace") {
        current.innerHTML = current.innerHTML.slice(0, -1)
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
    } else if (buttonType === "decimalPoint" && equalsPressed) {
        current.innerHTML = "0.";
        progress.innerHTML = "0.";
    }
}
function clearObj(operand) {
    for (let prop in operand) {
        delete operand[prop];
    }
}
function digitCase(operatorPressed, operand, buttonValue) {
    if (operatorPressed) {
      operand.secondNumber = (operand.secondNumber || '') + buttonValue; // if a number already exists, append the value to it. If the number is currently blank, simply assign the value to it. 
    } else if (equalsPressed) {
        operand.firstNumber = buttonValue;
        equalsPressed = false;
        decimalButton.disabled = false;
    } else {
      operand.firstNumber = (operand.firstNumber || '') + buttonValue;
    }
}
function decimalPoint(operand, buttonValue) {
    decimalButton.disabled = true;
    if (equalsPressed) {
        operand.firstNumber = buttonValue;
        equalsPressed = false;
    } else if (!operatorPressed) {
        operand.firstNumber = (operand.firstNumber || '') + buttonValue;
    } else {
        operand.secondNumber = (operand.secondNumber || '') + buttonValue;
    } 
}
function operatorCase(operand, buttonValue, buttonType) {
    decimalButton.disabled = false;
    equalsPressed ? equalsPressed = false : null;
    if (!operand.operator) {
        operand.operator = buttonValue;
    } else {
        let result = operate(operand); 
        operand.firstNumber = result;
        operand.secondNumber = "";
        operand.operator = buttonValue;
        updateDisplay(`${result.toLocaleString()}${buttonValue}`, buttonType);
    }
}
function equalsCase(operand, buttonType) {
    let solution = operate(operand);
    operand.firstNumber = solution;
    operand.operator = "";
    operand.secondNumber = "";
    updateDisplay(solution.toLocaleString(), buttonType);
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
    equalsPressed ? equalsPressed = false : null; //sets "equalsPressed" back to false so the display behaves properly
    let float;
    if (operand.secondNumber) {
        float = percentage(operand.secondNumber);
        operand.secondNumber = float;
        updateDisplay(`${operand.firstNumber}${operand.operator}${operand.secondNumber}`);
    } else {
        float = percentage(operand.firstNumber);
        operand.firstNumber = float;
        updateDisplay(operand.operator ? `${float}${operand.operator}` : float);

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
        numString = operand.operator ? `${operand.firstNumber}${operand.operator}` : operand.firstNumber;

    } else if (buttonType === "operator" && !operand.firstNumber) {
        numString = "";
    } else {
        numString = numString ? numString + buttonValue : buttonValue;
    }
    return numString;    
}

function disableOperators() {
        const operatorButtons = document.querySelectorAll('.operator')
        operatorButtons.forEach((button) => {
            button.disabled = true;
    });
}

function enableOperators() {
        const operatorButtons = document.querySelectorAll('.operator')
        operatorButtons.forEach((button) => {
            button.disabled = false;
    });
}

const operand = {};
let decimalButton = document.querySelector('.decimalPoint');
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
                enableOperators();
                break;
            case "decimalPoint":
                decimalPoint(operand, buttonValue);
                break;
            case "operator":
                if (!operand.firstNumber) {
                    break;
                }
                operatorCase(operand, buttonValue, buttonType);
                operatorPressed = true;
                disableOperators();
                break;
            case "equals":
                if (!operand.secondNumber) {
                    break;
                }
                decimalButton.disabled = false;                
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
                decimalButton.disabled = false;
                equalsPressed = false;
                enableOperators();
                break;
            case "percentage":
                percentCase(operand);
                break;
        }
        numString = ""; //clear the string after each button press ("numString" is only ever a single character)
        if (!operand.operator) {
            enableOperators();
        }
        console.log(operand);
        console.log(numString);
        console.log("OperatorPressed = ", operatorPressed); 
        console.log("EqualsPressed = ", equalsPressed);    
           
    })
    
})





