let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector(".input-box");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymobol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function flushoperation(intBuffer) {
  if (previousOperator == "+") {
    runningTotal += intBuffer;
  } else if (previousOperator == "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator == "*") {
    runningTotal *= intBuffer;
  } else if (previousOperator == "/") {
    runningTotal /= intBuffer;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    //do nothing
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushoperation(intBuffer);
  }
  previousOperator = value;
  buffer = "0";
}

function handleSymobol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushoperation(parseInt(buffer));
      buffer = "" + runningTotal;
      runningTotal = 0;
      previousOperator = null;
      break;

    case "+":
    case "-":
    case "*":
    case "/":
      handleMath(value);
  }
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  document
    .querySelector(".calc-body")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
