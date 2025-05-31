// Here we are fabricating a simple calculator website using HTML, CSS & JavaScript.

// literals
const buttons = document.querySelectorAll('button');
const operatorDiv = document.querySelector(".circles .operator");
const divisionButton = document.querySelector(".circles .divide");
const multiplicationButton = document.querySelector(".circles .multiply");
const operators = "+-*/^";
const allowedChar = "00123456789.";
const inputA = document.querySelector(".inputs input:nth-child(1)");
const inputB = document.querySelector(".inputs input:nth-child(2)");
const resultInput = document.querySelector(".inputs input:nth-child(3)");
let lastFocusedInput = inputA;
const operatorMapping = {
    "÷": "/",
    "×": "*",
    "+": "+",
    "-": "-",
    "^": "^"
};
const keyToDisplayMapping = {
    "/": "÷",
    "*": "×",
    "+": "+",
    "-": "-",
    "^": "^"
};



// debug

buttons.forEach(aButton => {                                    // tells button is clicked
    aButton.addEventListener("click", () => {
        console.log(`Clicked: ${aButton.textContent}`);
    }); 
});

document.addEventListener("keydown", (event) => {               // tells key is pressed
    if (!isNaN(event.key) || allowedChar.includes(event.key)) {
        console.log(`Key pressed: ${event.key}`);
    }
});


// defined
function focusShifter() {
    if (lastFocusedInput === inputA) {
        inputB.focus();
        lastFocusedInput = inputB;
    } else {
        inputA.focus();
        lastFocusedInput = inputA;
    }
}


buttons.forEach(aButton => {                                    // this is click handler function                                                           
    aButton.addEventListener("click", (event) => {
        const buttonText = aButton.textContent;

        if (buttonText === "=") {
            calculate();
        } 
        else if (operators.includes(buttonText) || buttonText === "÷" || buttonText === "×") {
            operatorDiv.textContent = buttonText;
            focusShifter();
        } 
        else if (allowedChar.includes(buttonText)) {
            lastFocusedInput.value += buttonText;
        }
    });
});


document.querySelector('.circles button').addEventListener("click", (event) => {
    inputA.value = "";
    inputB.value = "";
    resultInput.value = "";
    operatorDiv.textContent = "+";
    inputA.focus();
});

document.addEventListener("keydown", (event) => {               // this is tab switching function
    if (event.key === "Tab") {
        event.preventDefault();
        focusShifter();
    }
});



document.addEventListener("keydown", (event) => {               // this function handles correct input
    const activeInput = document.activeElement;

    if (event.key === "Escape"){
        inputA.value = "";
        inputB.value = "";
        resultInput.value = "";
        operatorDiv.textContent = "+";
        inputA.focus();
        event.preventDefault();
    }

    if ((event.key === "Backspace" || event.key === "Delete") && activeInput.tagName === "INPUT") {
        activeInput.value = activeInput.value.slice(0, -1)
        event.preventDefault();
    }

    if (operators.includes(event.key)) {    
        operatorDiv.textContent = keyToDisplayMapping[event.key] || event.key;
        focusShifter();
    }

    if (activeInput.tagName === "INPUT" && !allowedChar.includes(event.key)) {
        event.preventDefault();
        return;
    }
});



function calculate() {                                                  // calculate function
    const num1 = parseFloat(inputA.value);
    const num2 = parseFloat(inputB.value);
    const displayOperator = operatorDiv.textContent;
    const operator = operatorMapping[displayOperator] || displayOperator;

    let result;

    if (operator === "/" && num2 === 0) {
        resultInput.style.fontsize = '2rem';
        resultInput.style.textAlign = "center";
        resultInput.style.color = "red";
    }

    switch (operator) {
        case "+": result = (num1 + num2); break;
        case "-": result = (num1 - num2); break;
        case "*": result = (num1 * num2); break;
        case "/": result = (num2 !== 0) ? (num1 / num2).toFixed(5) : "Cannot divide by zero"; break;
        case "^": result = Math.pow(num1, num2); break;
        default: result = "Invalid operator"; break;
    }

    resultInput.value = result;
    inputA.focus();
}


// main
document.addEventListener("keydown", (event) => {
    if (event.key === "=" || event.key === "Enter") {
        calculate();
    }
});




