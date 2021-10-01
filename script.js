'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function (account) {
  containerMovements.innerHTML = '';
  account.movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--deposit">${
        i + 1
      } ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const movementDescription = movements.map((mov, i) => {
  return `Movment ${i + 1}: You ${
    mov > 0 ? 'deposited' : 'withdrew'
  } ${Math.abs(mov)}`;
});

const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.usernames = acc.owner
      .toLowerCase()
      .split(' ')
      .map(nam => nam[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);

/*
const balance = movements.reduce(function (acc, curr, i, _) {
  return acc + curr;
}, 0);
console.log(balance);
*/
// Displaying balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acu, cur) => acu + cur);
  labelBalance.textContent = acc.balance;
};

// Displaying summary
const calcDisplaySummary = function (acc) {
  const cashIn = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = cashIn;

  const cashOut = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = Math.abs(cashOut);
};
// Update UI function to update movements, summary and balance
const updateUI = function (acc) {
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
  displayMovements(acc);
};
//Event Handler
let currentAccount;
// Event Handler for login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc =>
      acc.usernames === inputLoginUsername.value &&
      acc.pin === Number(inputLoginPin.value)
  );

  containerApp.style.opacity = 100;

  updateUI(currentAccount);
  // Setting the the input login and pin to blank
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();

  console.log(currentAccount);
});

// Event handler for the transfer form.
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.usernames === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.usernames != currentAccount.usernames
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

// Event handler for loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loan = +inputLoanAmount.value;
  // Checking if there is a deposit >= .1* loanAmount
  if (amount > 0 && urrentAccount.movements.some(mov => mov >= 0.1 * loan)) {
    currentAccount.movements.push(loan);
    updateUI(currentAccount);
  }
});
