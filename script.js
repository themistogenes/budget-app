let budgetInput = document.getElementById('budget-input');
let expenseInput = document.getElementById('expense-input');
const addExpenseButton = document.getElementById('add-expense-button');
const setBudgetButton = document.getElementById('set-budget-button');
const expenseTitle = document.getElementById('expense-title');
const budgetError = document.getElementById('budget-error');
const expenseError = document.getElementById('expense-error');
const budgetDisplay = document.getElementById('budget-display');
const expensesDisplay = document.getElementById('expenses-display');
const balanceDisplay = document.getElementById('balance-display');
const list = document.getElementById('list');
let tempAmount = 0;

// set budget
setBudgetButton.addEventListener('click', () => {
  tempAmount = budgetInput.value;
  // handle empty or negative budget input
  if(tempAmount === '' || tempAmount < 0) {
    budgetError.classList.remove('hide');
  }
  else {
    budgetError.classList.add('hide');
    // show budget
    budgetDisplay.innerHTML = tempAmount;
    // show balance
    balanceDisplay.innerText = tempAmount - expensesDisplay.innerText;
    // clear budget input box
    budgetInput.value = '';
  }
})

// disable edit and delete buttons
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName('edit');
  Array.from(editButtons).forEach(element => {
    element.disabled = bool;
  })
}

// modify an element in the list
const modifyElement = (element, edit=false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceDisplay.innerText;
  let currentExpense = expensesDisplay.innerText;
  let parentAmount = parentDiv.querySelector('.amount').innerText;
  if(edit) {
    let parentText = parentDiv.querySelector('.expense').innerText;
    expenseTitle.value = parentText;
    expenseInput.value = parentAmount;
    disableButtons(true);
  }
  balanceDisplay.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expensesDisplay.innerText = parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
}

// create list of expenses
const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement('div');
  sublistContent.classList.add('sublist-content', 'flex-space');
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="expense">${expenseName}</p><p class="amount">${expenseValue}</p>`
  let editButton = document.createElement('button');
  editButton.classList.add('fa-solid', 'fa-pen-to-square', 'edit');
  editButton.style.fontSize = '24px';
  editButton.addEventListener('click', () => {
    modifyElement(editButton, true);
  })
  let deleteButton = document.createElement('button');
  deleteButton.classList.add('fa-solid', 'fa-trash-can', 'delete');
  deleteButton.style.fontSize = '24px';
  deleteButton.addEventListener('click', () => {
    modifyElement(deleteButton);
  })
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById('list').appendChild(sublistContent);
}

// add expense
addExpenseButton.addEventListener('click', () => {
  // handle empty inputs
  if(!expenseInput.value || !expenseTitle.value) {
    expenseError.classList.remove('hide');
    return false;
  }
  // enable buttons
  disableButtons(false);
  // new expense
  let newExpense = parseInt(expenseInput.value);
  // calculate and show total expenses (existing + new)
  let totalExpenses = parseInt(expensesDisplay.innerText) + newExpense;
  expensesDisplay.innerText = totalExpenses;
  // calculate and show total balance (budget - total expenses)
  const totalBalance = tempAmount - totalExpenses;
  balanceDisplay.innerText = totalBalance;
  // create list
  listCreator(expenseTitle.value, expenseInput.value);
  // empty inputs
  expenseTitle.value = '';
  expenseInput.value = '';
})