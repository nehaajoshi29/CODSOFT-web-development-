const display = document.getElementById("display");
let currentInput = '';
let previousInput = '';
let operator = null;

const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("operator")) {
      handleOperator(button.value);
    } else if (button.id === "clear") {
      clearDisplay();
    } else if (button.id === "equal") {
      calculate();
    } else {
      appendNumber(button.value);
    }
  });
});

function appendNumber(number) {
  if (currentInput === '' && number === '0') return;
  if (number === '.' && currentInput.includes('.')) return;
  currentInput += number;
  updateDisplay();
}

function updateDisplay() {
  display.innerText = currentInput || '0';
}

function handleOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay();
}