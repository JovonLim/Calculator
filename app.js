const nums = document.querySelectorAll('#operand');
const operators = document.querySelectorAll('#operator');
const decimal = document.querySelector('#decimal');
const delBtn = document.querySelector('#delete');
const clearBtn = document.querySelector('#clear');
const equalBtn = document.querySelector('#equal');
const innerText = document.querySelector('.innerText');
const outerText = document.querySelector('.outerText');

let firstOperand = "", operator = "", secondOperand = "";
let maxChar = 12;
let curChar = 0;
let isEqual = false;
let hasDecimal = false;

nums.forEach((num) => num.addEventListener("click", () => 
{
  if (isEqual) {
    innerText.textContent = "";
    isEqual = false;
  }
  if (++curChar <= maxChar) {
    innerText.textContent += num.textContent
  }
}));

operators.forEach((oper) => oper.addEventListener("click", () => 
{
  if (operator == "") {
    operator = oper.textContent;
    firstOperand = innerText.textContent;
    outerText.textContent = firstOperand + " " + operator;
    innerText.textContent = "";
    hasDecimal = false;
    curChar = 0;
  } else {
    let result = evalExpression();
    if (result) {
      firstOperand = innerText.textContent;
      operator = oper.textContent;
      innerText.textContent = "";
      outerText.textContent = firstOperand + " " + operator;
    }
  }
}));

decimal.addEventListener("click", () => {
  if (!hasDecimal) {
    if (++curChar <= maxChar) {
      hasDecimal = true;
      innerText.textContent += decimal.textContent;
    }
  }
})

delBtn.addEventListener("click", () =>
{
  innerText.textContent = "";
  hasDecimal = false;
  curChar = 0;
})

equalBtn.addEventListener("click", () => {
  let result = evalExpression();
  if (result) {
    isEqual = true;
  }
});

clearBtn.addEventListener("click", () => reset());

function evalExpression() {
  secondOperand = innerText.textContent;
  innerText.textContent = "";
  curChar = 0;
  if (firstOperand == "" || operator == "" || secondOperand == "") {
    return 0;
  }

  let firstOp = Number(firstOperand);
  let secondOp = Number(secondOperand);
  let result = 0;
  switch (operator) {
    case "%" :
      result = firstOp % secondOp;
      break;
    case "×" :
      result = firstOp * secondOp;
      break;
    case "+" :
      result = firstOp + secondOp;
      break;
    case "-" :
      result = firstOp - secondOp;
      break;
    case "÷" :
      if (secondOp == 0) {
        secondOperand = "";
        return;
      }
      result = firstOp / secondOp;
      break;
  }

  reset();
  innerText.textContent = result;
  return 1;
}

function reset() {
  firstOperand = "";
  operator = "";
  secondOperand = "";
  outerText.textContent = "";
  innerText.textContent = "";
  curChar = 0;
  hasDecimal = false;
}