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
    let x = operand.firstNumber;
    let y = operand.secondNumber;
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

function getButton(e) {
    buttonValue = e.currentTarget;
    return buttonValue;

}

function updateDisplay(input) {
    let current = document.querySelector('.currentDigit');
    let progress = document.querySelector('.top');
    let tmp = current.innerHTML;
    current.innerHTML = input;
    progress.innerHTML += tmp;
}

const operand = {};
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonType = e.target.className;
        let buttonValue = e.target.innerText;
        let operatorPressed = false;
        updateDisplay(buttonValue);
        console.log(buttonValue);
        switch (buttonType) {
            case "digit":
                if (!operand.firstNumber) {
                    operand.firstNumber = parseInt(buttonValue);
                }
                else {
                    operand.secondNumber = parseInt(buttonValue);
                }
                break;
            case "operator":
                if (!operand.operator) {
                    operand.operator = buttonValue;
                    operatorPressed = true;
                }
                break;
            case "equals":
                let solution = operate(operand);
                updateDisplay(solution);
        }
        
    
    })
})





