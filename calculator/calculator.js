
let num1 = '';
let num2 = '';
let operator = '';
let total = '';

$(document).ready(function () {
  $('button').on('click', function (e) {
    let btn = e.target.innerHTML;
    if (btn >= '0' && btn <= '9') {
      handleNumber(btn);
    } else {
      handleOperator(btn);
    }
  });
});

// function handleNumber(num) {
handleNumber = (num) => {
  if (num1 === '') {
    num1 = num;
  } else {
    num2 = num;
  }
  displayButton(num)
}

// function handleOperator(oper) {
handleOperator = (oper) => {
  if (operator === '') {
    operator = oper;
  } else {
    handleTotal();
    operator = oper;
  }
}

// function displayButton(btn) {
displayButton = (btn) => {
  $('.display').text(btn);
}

// function handleTotal() { 
handleTotal = () => {
  switch (operator) {
    case '+':
      total = +num1 + +num2;
      displayButton(total);
      break;
    case '-':
      total = +num1 - +num2;
      displayButton(total);
      break;
    case '/':
      total = +num1 / +num2;
      displayButton(total);
      break;
    case 'x':
      total = +num1 * +num2;
      displayButton(total);
      break;
  }
    updateVariables();
}

// function updateVariables() { 
  updateVariables = () => { 
    num1 = total;
    num2 = '';
}

