// create a function to create buttons
let createButton = () => {
  const buttonsContainer = document.querySelector(".buttons-container");
  const btnText = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
    "Ans",
    "DEL",
    "AC",
  ];

  btnText.forEach((text) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.classList.add("btn");
    buttonsContainer.appendChild(button);
  });
};
createButton();

// Handle button clicks and evaluation
const nums = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ".",
  "+",
  "-",
  "*",
  "/",
];

const operators = ["+", "-", "*", "/"];

const buttons = document.querySelectorAll(".btn");
const screen = document.querySelector("#screen");
let lastAnswer = "";
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    if (buttonText === "AC") {
      screen.innerText = "";
    } else if (buttonText === "DEL") {
      screen.innerText = screen.innerText.slice(0, -1);
    } else if (buttonText === "Ans") {
      screen.innerText = "";
      screen.innerText += lastAnswer;
    } else if (buttonText === ".") {
      const parts = screen.innerText.split(/[\+\-\*\/]/);
      const lastNumber = parts[parts.length - 1];

      if (!lastNumber.includes(".")) {
        screen.innerText += ".";
      }
    } else if (nums.includes(buttonText)) {
      screen.innerText += buttonText;
    }
    if (buttonText === "=") {
      let operandsStack = [];
      let operatorsStack = [];
      let result = 0;
      toPostfix(screen.innerText).forEach((char) => {
        if (!isNaN(char)) {
          operandsStack.push(char);
        } else if (operators.includes(char)) {
          operatorsStack.push(char);
        }
        while (operandsStack.length > 1 && operatorsStack.length > 0) {
          const b = parseFloat(operandsStack.pop());
          const a = parseFloat(operandsStack.pop());
          const operator = operatorsStack.pop();
          result = evaluate(a, b, operator);
          operandsStack.push(result);
        }
        screen.innerText = String(result);
        lastAnswer = String(result);
      });
    }
  });
});

const evaluate = (a, b, operator) => {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return null;
  }
};

// Function to transform infix to postfix to evaluate
function toPostfix(expr) {
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
  const output = [];
  const ops = [];

  // tokenize
  const tokens = expr.match(/\d+\.?\d*|[+\-*/]/g);

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      output.push(token);
    } else {
      while (
        ops.length &&
        precedence[ops[ops.length - 1]] >= precedence[token]
      ) {
        output.push(ops.pop());
      }
      ops.push(token);
    }
  });

  while (ops.length) output.push(ops.pop());
  return output;
}
